import { assert } from 'chai';
import 'mocha';
import { count, countAll, countIf } from 'src/counter';

describe('src/counter', () => {
    describe('count', () => {
        it('counts words', () => {
            assert.deepEqual(count(['foo', 'bar', 'foo']), { foo: 2, bar: 1 });
        });
        it('counts numbers', () => {
            assert.deepEqual(count([1, 2, 0, 0]), { 1: 1, 2: 1, 0: 2 });
        });
    });

    describe('countAll', () => {
        it('counts several results', () => {
            const words = { words: { foo: 2, bar: 1 } };
            const numbers = { numbers: { 5: 2, 0: 4 } };
            assert.deepEqual(countAll([words, numbers]), { ...words, ...numbers });
        });
    });

    describe('countIf', () => {
        it('without predicates', () => {
            assert.deepEqual(countIf([])([1, 2, "word"]), { 1: 1, 2: 1, word: 1 });
        });

        it('with predicates', () => {
            const preds = [(el) => el === 2];
            assert.deepEqual(countIf(preds)([1, 2, "word", 2, 5, 2]), { 2: 3 });
        });
    });
});
