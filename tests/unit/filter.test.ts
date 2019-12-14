import { assert } from 'chai';
import 'mocha';
import { filterIf, ignoreIf } from 'src/filter';

describe('src/filter', () => {
   describe('filterIf', () => {

      it('filter without predicates', () => {
         assert.sameMembers(filterIf([])([1, 2]), [1, 2]);
      });

      it('filter with predicates', () => {
         const preds = [() => false];
         assert.sameMembers(filterIf(preds)([1, 2]), []);
      });

      it('filter with predicates', () => {
         const preds = [(el) => el === 2];
         assert.sameMembers(filterIf(preds)([1, 2, 3]), [2]);
      });
   });

   describe('ignoreIf', () => {

      it('ignore without predicates', () => {
         assert.sameMembers(ignoreIf([])([1, 2]), [1, 2]);
      });

      it('ignore with predicates', () => {
         const preds = [() => false];
         assert.sameMembers(ignoreIf(preds)([1, 2]), [1, 2]);
      });

      it('ignore with predicates', () => {
         const preds = [(el) => el === 2];
         assert.sameMembers(ignoreIf(preds)([1, 2, 3]), [1, 3]);
      });
   });
});
