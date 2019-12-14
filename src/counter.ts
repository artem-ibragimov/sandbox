/// <amd-module name='src/counter' />

import { IPredicate } from 'src/predicate';
import { filterIf } from 'src/filter';

export const createCounter: ILabelCounter = (label: string) => (preds) =>
   (elems) => ({ [label]: countIf(preds)(elems) });

export const countAll = (results: ILabelCounterResult[]): ILabelCounterResult =>
   Object.assign({}, ...results);

export const countIf: IConditionalCounter = (preds) =>
   (elems) => count(filterIf(preds)(elems));

export const count = <T extends ICounterKey>(elems: T[]): ICounterResult =>
   elems.reduce((res: ICounterResult, el) => {
      res[el] = (res[el] || 0) + 1;
      return res;
   }, {});

type ILabelCounter = <T extends ICounterKey>(label: string) =>
   (preds: IPredicate<T>[]) => (elems: T[]) => ILabelCounterResult;

interface ILabelCounterResult {
   [label: string]: ICounterResult;
};

type IConditionalCounter = <T extends ICounterKey>(preds: IPredicate<T>[]) => ICounter<T>;
type ICounter<T extends ICounterKey> = (elems: T[]) => ICounterResult;
type ICounterKey = number | string;
type ICounterResult = Record<ICounterKey, number>;