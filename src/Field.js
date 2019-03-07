define("src/Field", ["require", "exports", "src/Const"], function (require, exports, Const_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Field {
        /**
         * @param {Number} length размер игрового поля
         * @constructor
         */
        constructor(length, markerValues) {
            this.length = length;
            this.markerValues = markerValues;
            /** Имеется ли выигрышная комбинация */
            this.isDone = false;
            /** Поле полностью заполненно */
            this.isFull = false;
            /** Максимальный индекс маркера */
            this.maxIndex = 0;
            /** Поле, где ставятся маркеры */
            this._field = [];
            if (!length || length < 1) {
                throw new Error(Const_1.ERROR.FIELD.INCORRECT_RANGE(length));
            }
            this.maxIndex = length - 1;
            this._field = Array.from({ length }, () => Array.from({ length }, () => null));
        }
        get field() {
            return this._field;
        }
        set field(value) {
            if (!value || !Array.isArray(value) || !Array.isArray(value[0])) {
                throw new Error(Const_1.ERROR.FIELD.INCORRECT_FIELD);
            }
            this._field = value;
        }
        set(marker, row, column) {
            if (row > this.maxIndex || column > this.maxIndex) {
                throw new Error(Const_1.ERROR.FIELD.OUT_OF_RANGE(this.length));
            }
            if (!this.markerValues.includes(marker)) {
                throw new Error(Const_1.ERROR.FIELD.WRONG_MARKER(marker, JSON.stringify(this.markerValues)));
            }
            if (this.isDone) {
                throw new Error(Const_1.ERROR.GAME.HAVE_CHAMPION);
            }
            if (this.isFull) {
                throw new Error(Const_1.ERROR.FIELD.FULLFILLED);
            }
            if (this._field[row][column]) {
                throw new Error(Const_1.ERROR.FIELD.CELL_FILLED(this._field[row][column]));
            }
            this._field[row][column] = marker;
            this.isDone = this._checkIsDone();
            this.isFull = this._checkIsFull();
        }
        print() {
            console.table(this._field);
        }
        toString() {
            const data = {
                isDone: this.isDone,
                isFull: this.isFull,
                field: this._field,
            };
            return JSON.stringify(data);
        }
        fromString(str) {
            const data = JSON.parse(str);
            Object.keys(data).forEach((prop) => this[prop] = data[prop]);
            return this.field;
        }
        /** Проверка, что все поле заполненно */
        _checkIsFull() {
            return this._field.every((row) => row.every((cell) => cell !== null));
        }
        /** Проверка выигрышной комбинации */
        _checkIsDone() {
            return this._isHorizontalDone || this._isDiagonalDone || this._isVerticalDone;
        }
        /** Проверка горизонтального выигрышной комбинации */
        get _isHorizontalDone() {
            return this._field.some((row) => row.every((cell) => cell && cell === row[0]));
        }
        /** Проверка вертикального выигрышной комбинации */
        get _isVerticalDone() {
            for (let column = 0; column < this.length; column++) {
                const topColumnEl = this._field[0][column];
                if (!topColumnEl) {
                    continue;
                }
                let verticalDone = true;
                for (let row = 0; row < this.length; row++) {
                    if (this._field[row][column] !== topColumnEl) {
                        verticalDone = false;
                        break;
                    }
                }
                if (verticalDone) {
                    return true;
                }
            }
            return false;
        }
        /** Проверка диагональной выигрышной комбинации */
        get _isDiagonalDone() {
            const topLeftEl = this._field[0][0];
            const topRightEl = this._field[0][this.maxIndex];
            if (!topLeftEl && !topRightEl) {
                return false;
            }
            let rightDiagonalDone = (topRightEl !== null);
            let leftDiagonalDone = (topLeftEl !== null);
            for (let i = 0; i < this.length; i++) {
                leftDiagonalDone = leftDiagonalDone && (this._field[i][i] === topLeftEl);
                rightDiagonalDone = rightDiagonalDone && (this._field[i][this.maxIndex - i] === topRightEl);
                if (!leftDiagonalDone && !rightDiagonalDone) {
                    return false;
                }
            }
            return true;
        }
    }
    exports.default = Field;
});
