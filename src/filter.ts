import { IPredicate } from 'src/predicate';

export const filterIf: IFilter = (preds) => (elems) => {
   return Promise.resolve(preds.reduce((elems, pred) => elems.filter(pred), elems));
};

export const ignoreIf: IFilter = (preds) => {
   return filterIf(preds.map((p) => (s) => !p(s)));
};

type IFilter = (ps: IPredicate[]) => (elems: string[]) => Promise<string[]>;