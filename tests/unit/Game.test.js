define(["require", "exports", "chai", "src/Const", "src/Game", "mocha"], function (require, exports, chai_1, Const_1, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Game', () => {
        describe('constructor', () => {
            it('new Game', () => chai_1.assert.instanceOf(new Game_1.default(), Game_1.default));
        });
        describe('Определение случая "Ничья"', () => {
            it(`
        o | x | o
        x | o | x
        x | o | x`, () => {
                const g = new Game_1.default();
                g.set('x', 0, 1);
                g.set('o', 0, 2);
                g.set('x', 1, 0);
                g.set('o', 1, 1);
                g.set('x', 1, 2);
                g.set('o', 2, 1);
                g.set('x', 2, 0);
                g.set('o', 0, 0);
                chai_1.assert.strictEqual(g.set('x', 2, 2), Const_1.MSG.GAME.NO_CHAMPION);
            });
        });
    });
});
