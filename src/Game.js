define("src/Game", ["require", "exports", "src/Const", "src/Field"], function (require, exports, Const_1, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor() {
            /** Допустимые значения маркера */
            this.markerValues = ['x', 'o'];
            if (typeof localStorage !== typeof void 0 || typeof sessionStorage !== typeof void 0) {
                this.storage = localStorage || sessionStorage;
            }
            this.field = new Field_1.default(3, this.markerValues);
            (this.restore()) ? console.log(Const_1.MSG.GAME.LOADED) : console.log(Const_1.MSG.GAME.NEW);
        }
        set(marker, row, column) {
            try {
                this.checkPlaySeq(marker);
                this.field.set(marker, row, column);
            }
            catch (e) {
                return e;
            }
            this.lastMarker = marker;
            this.store();
            if (this.field.isDone) {
                this.champion = marker;
                return Const_1.MSG.GAME.CHAMPION(this.champion);
            }
            if (this.field.isFull) {
                return Const_1.MSG.GAME.NO_CHAMPION;
            }
        }
        end() {
            this.field.print();
            this.clear();
        }
        show() {
            this.field.print();
        }
        /** Сохранение в браузерном Storage игрового поля */
        store() {
            if (!this.storage) {
                return;
            }
            this.storage.setItem('field', this.field.toString());
            this.storage.setItem('lastMarker', this.lastMarker);
            this.storage.setItem('champion', this.champion);
        }
        /** Восстановление из браузерного Storage игрового поля */
        restore() {
            if (!this.storage) {
                return false;
            }
            const storagedField = this.storage.getItem('field');
            if (!storagedField) {
                return false;
            }
            this.field.fromString(storagedField);
            this.lastMarker = this.storage.getItem('lastMarker');
            this.champion = this.storage.getItem('champion');
            return true;
        }
        /** Очистить браузерный Storage */
        clear() {
            if (this.storage) {
                this.storage.removeItem('field');
                this.storage.removeItem('champion');
            }
        }
        /** Проверка очередности ходов игроков */
        checkPlaySeq(marker) {
            if (this.lastMarker === marker) {
                throw new Error(Const_1.ERROR.GAME.WRONG_PLAY_SEQ);
            }
        }
    }
    exports.default = Game;
});
