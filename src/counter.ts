/// <amd-module name='src/counter' />

import { IPredicate } from 'src/predicate';
import { filterIf } from 'src/filter';

export const createCounter: ICounterCreator = (label: string) => (preds) => (elems) =>
   Object.defineProperty({}, label, { value: countIf(preds)(elems) });

export const countIf: IConditionalCounter = (preds) =>
   (elems) => count(filterIf(preds)(elems));

export const count = <T extends ICounterKey>(elems: T[]): ICounterResult =>
   elems.reduce((res: ICounterResult, el) => {
      res[el] = (res[el] || 0) + 1;
      return res;
   }, {});

type ICounterCreator = <T extends ICounterKey>(label: string) =>
   (preds: IPredicate<T>[]) =>
      (elems: T[]) => {
         [label: string]: ICounterResult;
      };

type IConditionalCounter = <T extends ICounterKey>(preds: IPredicate<T>[]) => ICounter<T>;
type ICounter<T extends ICounterKey> = (elems: T[]) => ICounterResult;
type ICounterKey = number | string;
type ICounterResult = Record<ICounterKey, number>;