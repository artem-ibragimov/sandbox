/// <amd-module name='src/filter' />
import { IPredicate } from 'src/predicate';

export const filterIf: IConditionalFilter = (preds) => (elems) => preds.reduce((elems, pred) => elems.filter(pred), elems);
export const ignoreIf: IConditionalFilter = (preds) => filterIf(preds.map((p) => (s) => !p(s)));

type IConditionalFilter = <T>(preds: IPredicate<T>[]) => IFilter<T>;
type IFilter<T> = (elems: T[]) => T[];
