define("src/Game", ["require", "exports", "src/Field"], function (require, exports, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            this.field = new Field_1.default(3);
            console.log('Игра начинается');
        }
        set(marker, row, column) {
            try {
                this.field.set(marker, row, column);
            }
            catch (e) {
                console.error(e);
                return;
            }
            this.field.print();
            if (this.field.isDone) {
                console.log(`Победитель ${marker}!`);
                return;
            }
            if (this.field.isFull) {
                console.log('Поле заполенно, конец игре...');
            }
        }
        end() {
            this.field.print();
        }
    }
    exports.default = Game;
});
