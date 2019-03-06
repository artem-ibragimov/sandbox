/// <amd-module name='src/Field' />
define("src/Field", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Field {
        /**
         * @param {Number} length размер игрового поля
         * @constructor
         */
        constructor(length) {
            this.length = length;
            /** Имеется ли выигрышная комбинация */
            this.isDone = false;
            /** Поле полностью заполненно */
            this.isFull = false;
            /** Максимальный индекс маркера */
            this.maxIndex = 0;
            /** Поле, где ставятся маркеры */
            this._field = [];
            if (!length || length < 1) {
                throw new Error(`Некорректный размер поля '${length}'!`);
            }
            this.maxIndex = length - 1;
            this._field = Array.from({ length }, () => Array.from({ length }, () => null));
        }
        get field() {
            return this._field;
        }
        set field(value) {
            if (!value || !Array.isArray(value) || !Array.isArray(value[0])) {
                throw new Error('field должен быть двумерным массивом!');
            }
            this._field = value;
        }
        set(marker, row, column) {
            if (row > this.maxIndex || column > this.maxIndex) {
                throw new Error(`Выход за границы поля ${this.length}x${this.length}`);
            }
            if (this.isDone || this.isFull) {
                throw new Error('Игра окончена!');
            }
            if (this._field[row][column]) {
                throw new Error(`Ячейка занята символом ${this._field[row][column]}!`);
            }
            this._field[row][column] = marker;
            this.isDone = this._checkIsDone();
            this.isFull = this._checkIsFull();
        }
        print() {
            console.table(this._field);
        }
        toString() {
            return JSON.stringify(this._field);
        }
        fromString(str) {
            this.field = JSON.parse(str);
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
