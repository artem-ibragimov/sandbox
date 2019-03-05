/// <amd-module name='src/Field' />

export default class Field {
   _field: Array<Array<Marker | void>> = [];

   /** Имеется ли выигрышная комбинация */
   isDone: boolean = false;
   /** Поле полностью заполненно */
   isFull: boolean = false;

   set field(value) {
      if (!value || !Array.isArray(value) || !Array.isArray(value[0])) {
         throw new Error('field должен быть двумерным массивом!')
      }
      this._field = value;
   }
   /**
    * @param {Number} length размер игрового поля
    * @constructor
    */
   constructor(private length: number) {
      if (!length || length < 1) {
         throw new Error(`Некорректный размер поля '${length}'!`);
      }
      this._field = Array.from({ length }, () => Array.from({ length }, () => void 0));
   }

   set(marker: Marker, row: number, column: number) {
      if (row > this.length || column > this.length) {
         throw new Error(`Выход за границы поля ${this.length}x${this.length}`);
      }
      if (this.isDone || this.isFull){
         throw new Error('Игра окончена!')
      }
      this._field[row][column] = marker;
      this.isDone = this._checkIsDone();
      this.isFull = this._checkIsFull();
   }
   print(): void {
      console.table(this._field);
   }

   toString() {
      return JSON.stringify(this._field, null, 3);
   }

   fromString(str) {
      this.field = JSON.parse(str);
   }

   /** Проверка, что все поле заполненно */
   _checkIsFull(): boolean {
      return this._field.every((row) => row.every((cell) => cell !== void 0));
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
         const topColumnEl: Marker | void = this._field[0][column];
         if (!topColumnEl) { return false; }
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
      const topRightEl = this._field[this.length - 1][this.length - 1];

      if (!topLeftEl || !topRightEl) { return false; }

      let leftDiagonalDone = true;
      let rightDiagonalDone = true;

      for (let i = 0; i < this.length; i++) {
         if (this._field[i][i] !== topLeftEl) {
            leftDiagonalDone = false;
            break;
         }
      }
      for (let i = this.length - 1; i >= 0; i--) {
         if (this._field[i][i] !== topRightEl) {
            rightDiagonalDone = false;
            break
         }
      }
      return leftDiagonalDone || rightDiagonalDone;
   }
}

export type Marker = 'o' | 'x'