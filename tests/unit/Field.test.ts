import { assert } from 'chai';
import 'mocha';
import Field from 'src/Field';

describe('Field', () => {

    describe('constructor', () => {

        it('new Field', () => {
            const f = new Field(2);
            assert.instanceOf(f, Field);
        });

        it('Выброс исключения при задании некорректных размеров поля', () => {
            try {
                new Field(0); // tslint:disable-line
            } catch (e) {
                assert.instanceOf(e, Error);
            }
        });
    });

    describe('set', () => {

        it('Выброс исключения при выходе за границы', () => {
            const f = new Field(2);
            try {
                f.set('x', 3, 3);
            } catch (e) {
                assert.instanceOf(e, Error);
            }
        });

        it('Выброс исключения при попытке установить маркер на завершенном поле', () => {
            const f = new Field(3);
            f.set('x', 0, 0); f.set('o', 0, 1); f.set('x', 0, 2);
            f.set('o', 1, 0); f.set('x', 1, 1); f.set('o', 1, 2);
            f.set('o', 2, 0); f.set('x', 2, 1); f.set('o', 2, 2);
            try {
                f.set('x', 1, 1);
            } catch (e) {
                assert.instanceOf(e, Error);
            }
        });

        it('Выброс исключения при попытке установить маркер в занятую ячейку', () => {
            const f = new Field(2);
            f.set('x', 0, 1);
            try {
                f.set('o', 0, 1);
            } catch (e) {
                assert.instanceOf(e, Error);
            }
        });

    });

    describe('toString', () => {
        it('toString возвращает строку', () => {
            const f = new Field(2);
            assert.typeOf(f.toString(), 'string');
        });
    });

    describe('fromString', () => {
        it('fromString возвращает двумерный массив', () => {
            const f = new Field(2);
            const result = f.fromString("[[1,2],[3,4]]");
            assert.isTrue(Array.isArray(result) && Array.isArray(result[0]));
        });
    });

    describe('fromString <-> toString ', () => {
        it('object <=> fromString (toString object)', () => {
            const f = new Field(2);
            f.set('x', 0, 0);
            f.set('o', 1, 1);
            assert.deepEqual(new Field(2).fromString(f.toString()), f.field);

        });
    });
    describe('isFull', () => {

        it(`
        _ | x
        _ | o`, () => {
                const f = new Field(2);
                f.set('x', 0, 1);
                f.set('o', 1, 1);
                assert.isFalse(f.isFull);
            });

        it(`
        o | x | o
        x | o | x
        x | o | x`, () => {
                const f = new Field(3);
                f.set('o', 0, 0); f.set('x', 0, 1); f.set('o', 0, 2);
                f.set('x', 1, 0); f.set('o', 1, 1); f.set('x', 1, 2);
                f.set('x', 2, 0); f.set('o', 2, 1); f.set('x', 2, 2);
                assert.isTrue(f.isFull);
            });
    });

    describe('isDone', () => {

        it(`
        _ | x
        x | _`, () => {
                const f = new Field(2);
                f.set('x', 0, 1);
                f.set('x', 1, 0);
                assert.isTrue(f.isDone);
            });

        it(`
        x | _ | _
        _ | x | _
        _ | _ | x`, () => {
                const f = new Field(3);
                f.set('x', 0, 0);
                f.set('x', 1, 1);
                f.set('x', 2, 2);
                assert.isTrue(f.isDone);
            });
        it(`
        x | _ | _
        _ | x | x
        _ | _ | o`, () => {
                const f = new Field(3);
                f.set('x', 0, 0);
                f.set('x', 1, 1); f.set('x', 1, 2);
                f.set('o', 2, 2);
                assert.isFalse(f.isDone);
            });

        it(`
        x | x | x
        _ | _ | _
        _ | _ | _`, () => {
                const f = new Field(3);
                f.set('x', 0, 0);
                f.set('x', 0, 1);
                f.set('x', 0, 2);
                assert.isTrue(f.isDone);
            });

        it(`
        _ | x | _
        _ | x | _
        _ | x | _`, () => {
                const f = new Field(3);
                f.set('x', 2, 1);
                f.set('x', 0, 1);
                f.set('x', 1, 1);
                assert.isTrue(f.isDone);
            });

        it(`
        _ | x | _
        _ | o | _
        _ | x | _`, () => {
                const f = new Field(3);
                f.set('x', 0, 0);
                f.set('o', 1, 0);
                f.set('x', 2, 0);
                assert.isFalse(f.isDone);
            });

        it(`
        o | x | x
        o | o | x
        x | x | o`, () => {
                const f = new Field(3);
                f.set('o', 0, 0); f.set('x', 0, 1); f.set('x', 0, 2);
                f.set('o', 1, 0); f.set('o', 1, 1); f.set('x', 1, 2);
                f.set('x', 2, 0); f.set('x', 2, 1); f.set('o', 2, 2);
                assert.isTrue(f.isDone);
            });
    });
});
