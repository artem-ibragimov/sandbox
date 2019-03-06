define(["require", "exports", "chai", "src/Field", "mocha"], function (require, exports, chai_1, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Field', () => {
        describe('constructor', () => {
            it('new Field', () => {
                const f = new Field_1.default(2);
                chai_1.assert.instanceOf(f, Field_1.default);
            });
            it('Выброс исключения при задании некорректных размеров поля', () => {
                try {
                    new Field_1.default(0); // tslint:disable-line
                }
                catch (e) {
                    chai_1.assert.instanceOf(e, Error);
                }
            });
        });
        describe('set', () => {
            it('Выброс исключения при выходе за границы', () => {
                const f = new Field_1.default(2);
                try {
                    f.set('x', 3, 3);
                }
                catch (e) {
                    chai_1.assert.instanceOf(e, Error);
                }
            });
            it('Выброс исключения при попытке установить маркер на завершенном поле', () => {
                const f = new Field_1.default(3);
                f.set('x', 0, 0);
                f.set('o', 0, 1);
                f.set('x', 0, 2);
                f.set('o', 1, 0);
                f.set('x', 1, 1);
                f.set('o', 1, 2);
                f.set('o', 2, 0);
                f.set('x', 2, 1);
                f.set('o', 2, 2);
                try {
                    f.set('x', 1, 1);
                }
                catch (e) {
                    chai_1.assert.instanceOf(e, Error);
                }
            });
            it('Выброс исключения при попытке установить маркер в занятую ячейку', () => {
                const f = new Field_1.default(2);
                f.set('x', 0, 1);
                try {
                    f.set('o', 0, 1);
                }
                catch (e) {
                    chai_1.assert.instanceOf(e, Error);
                }
            });
        });
        describe('toString', () => {
            it('toString возвращает строку', () => {
                const f = new Field_1.default(2);
                chai_1.assert.typeOf(f.toString(), 'string');
            });
        });
        describe('fromString', () => {
            it('fromString возвращает двумерный массив', () => {
                const f = new Field_1.default(2);
                const result = f.fromString("[[1,2],[3,4]]");
                chai_1.assert.isTrue(Array.isArray(result) && Array.isArray(result[0]));
            });
        });
        describe('fromString <-> toString ', () => {
            it('object <=> fromString (toString object)', () => {
                const f = new Field_1.default(2);
                f.set('x', 0, 0);
                f.set('o', 1, 1);
                chai_1.assert.deepEqual(new Field_1.default(2).fromString(f.toString()), f.field);
            });
        });
        describe('isFull', () => {
            it(`
        _ | x
        _ | o`, () => {
                const f = new Field_1.default(2);
                f.set('x', 0, 1);
                f.set('o', 1, 1);
                chai_1.assert.isFalse(f.isFull);
            });
            it(`
        o | x | o
        x | o | x
        x | o | x`, () => {
                const f = new Field_1.default(3);
                f.set('o', 0, 0);
                f.set('x', 0, 1);
                f.set('o', 0, 2);
                f.set('x', 1, 0);
                f.set('o', 1, 1);
                f.set('x', 1, 2);
                f.set('x', 2, 0);
                f.set('o', 2, 1);
                f.set('x', 2, 2);
                chai_1.assert.isTrue(f.isFull);
            });
        });
        describe('isDone', () => {
            it(`
        _ | x
        x | _`, () => {
                const f = new Field_1.default(2);
                f.set('x', 0, 1);
                f.set('x', 1, 0);
                chai_1.assert.isTrue(f.isDone);
            });
            it(`
        x | _ | _
        _ | x | _
        _ | _ | x`, () => {
                const f = new Field_1.default(3);
                f.set('x', 0, 0);
                f.set('x', 1, 1);
                f.set('x', 2, 2);
                chai_1.assert.isTrue(f.isDone);
            });
            it(`
        x | _ | _
        _ | x | x
        _ | _ | o`, () => {
                const f = new Field_1.default(3);
                f.set('x', 0, 0);
                f.set('x', 1, 1);
                f.set('x', 1, 2);
                f.set('o', 2, 2);
                chai_1.assert.isFalse(f.isDone);
            });
            it(`
        x | x | x
        _ | _ | _
        _ | _ | _`, () => {
                const f = new Field_1.default(3);
                f.set('x', 0, 0);
                f.set('x', 0, 1);
                f.set('x', 0, 2);
                chai_1.assert.isTrue(f.isDone);
            });
            it(`
        _ | x | _
        _ | x | _
        _ | x | _`, () => {
                const f = new Field_1.default(3);
                f.set('x', 2, 1);
                f.set('x', 0, 1);
                f.set('x', 1, 1);
                chai_1.assert.isTrue(f.isDone);
            });
            it(`
        _ | x | _
        _ | o | _
        _ | x | _`, () => {
                const f = new Field_1.default(3);
                f.set('x', 0, 0);
                f.set('o', 1, 0);
                f.set('x', 2, 0);
                chai_1.assert.isFalse(f.isDone);
            });
            it(`
        o | x | x
        o | o | x
        x | x | o`, () => {
                const f = new Field_1.default(3);
                f.set('o', 0, 0);
                f.set('x', 0, 1);
                f.set('x', 0, 2);
                f.set('o', 1, 0);
                f.set('o', 1, 1);
                f.set('x', 1, 2);
                f.set('x', 2, 0);
                f.set('x', 2, 1);
                f.set('o', 2, 2);
                chai_1.assert.isTrue(f.isDone);
            });
        });
    });
});
