/// <amd-module name='src/Field' />
import { ERROR } from 'src/Const';

export default class Field {
   /** Имеется ли выигрышная комбинация */
   isDone: boolean = false;
   /** Поле полностью заполненно */
   isFull: boolean = false;
   /** Максимальный индекс маркера */
   maxIndex: number = 0;
   /** Поле, где ставятся маркеры */
   private _field: DataField = [];

   get field() {
      return this._field;
   }

   set field(value) {
      if (!value || !Array.isArray(value) || !Array.isArray(value[0])) {
         throw new Error(ERROR.FIELD.INCORRECT_FIELD);
      }
      this._field = value;
   }

   /**
    * @param {Number} length размер игрового поля
    * @constructor
    */
   constructor(private length: number, private markerValues: Array<any>) {
      if (!length || length < 1) {
         throw new Error(ERROR.FIELD.INCORRECT_RANGE(length));
      }
      this.maxIndex = length - 1;
      this._field = Array.from({ length }, () => Array.from({ length }, () => null));
   }

   set(marker, row: number, column: number) {
      if (row > this.maxIndex || column > this.maxIndex) {
         throw new Error(ERROR.FIELD.OUT_OF_RANGE(this.length));
      }
      if (!this.markerValues.includes(marker)) {
         throw new Error(ERROR.FIELD.WRONG_MARKER(marker, JSON.stringify(this.markerValues)));
      }
      if (this.isDone) {
         throw new Error(ERROR.GAME.HAVE_CHAMPION);
      }
      if (this.isFull) {
         throw new Error(ERROR.FIELD.FULLFILLED);
      }
      if (this._field[row][column]) {
         throw new Error(ERROR.FIELD.CELL_FILLED(this._field[row][column]));
      }
      this._field[row][column] = marker;
      this.isDone = this._checkIsDone();
      this.isFull = this._checkIsFull();
   }

   print(): void {
      console.table(this._field);
   }

   toString() {
      const data: ISerializedData = {
         isDone: this.isDone,
         isFull: this.isFull,
         field: this._field,
      };
      return JSON.stringify(data);
   }

   fromString(str) {
      const data: ISerializedData = JSON.parse(str);
      Object.keys(data).forEach((prop) => this[prop] = data[prop]);
      return this.field;
   }

   /** Проверка, что все поле заполненно */
   _checkIsFull(): boolean {
      return this._field.every((row) => row.every((cell) => cell !== null));
   }

   /** Проверка выигрышной комбинации */
   _checkIsDone(): boolean {
      return this._isHorizontalDone || this._isDiagonalDone || this._isVerticalDone;
   }

   /** Проверка горизонтального выигрышной комбинации */
   get _isHorizontalDone(): boolean {
      return this._field.some((row) => row.every((cell) => cell && cell === row[0]));
   }

   /** Проверка вертикального выигрышной комбинации */
   get _isVerticalDone(): boolean {
      for (let column = 0; column < this.length; column++) {
         const topColumnEl = this._field[0][column];
         if (!topColumnEl) { continue; }
         let verticalDone = true;
         for (let row = 0; row < this.length; row++) {
            if (this._field[row][column] !== topColumnEl) {
               verticalDone = false;
               break;
            }
         }
         if (verticalDone) { return true; }
      }
      return false;
   }

   /** Проверка диагональной выигрышной комбинации */
   get _isDiagonalDone(): boolean {
      const topLeftEl = this._field[0][0];
      const topRightEl = this._field[0][this.maxIndex];

      if (!topLeftEl && !topRightEl) { return false; }

      let rightDiagonalDone = (topRightEl !== null);
      let leftDiagonalDone = (topLeftEl !== null);

      for (let i = 0; i < this.length; i++) {
         leftDiagonalDone = leftDiagonalDone && (this._field[i][i] === topLeftEl);
         rightDiagonalDone = rightDiagonalDone && (this._field[i][this.maxIndex - i] === topRightEl);
         if (!leftDiagonalDone && !rightDiagonalDone) { return false; }
      }
      return true;
   }
}
type DataField = Array<Array<any | null>>;

interface ISerializedData {
   isDone: boolean;
   isFull: boolean;
   field: DataField;
}
