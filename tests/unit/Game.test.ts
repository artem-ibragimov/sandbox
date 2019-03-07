import { assert } from 'chai';
import 'mocha';
import { MSG } from 'src/Const';
import Game from 'src/Game';

describe('Game', () => {
    describe('constructor', () => {
        it('new Game', () => assert.instanceOf(new Game(), Game));
    });
    describe('Определение случая "Ничья"', () => {
        it(`
        o | x | o
        x | o | x
        x | o | x`, () => {
                const g = new Game();
                g.set('x', 0, 1);
                g.set('o', 0, 2);
                g.set('x', 1, 0);
                g.set('o', 1, 1);
                g.set('x', 1, 2);
                g.set('o', 2, 1);
                g.set('x', 2, 0);
                g.set('o', 0, 0);
                assert.strictEqual(g.set('x', 2, 2), MSG.GAME.NO_CHAMPION);
            });
    });
});
