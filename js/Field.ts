class Field {
    _field: Array<Array<Marker | void>> = [];
 
 
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
 
    toString() {
       return JSON.stringify(this._field, null, 3);
    }
 
    fromString(str) {
       this.field = JSON.parse(str);
    }
 
    /** Проверка, что все поле заполненно */
    get _isFull(): boolean {
       return this._field.every((row) => row.every((cell) => cell !== void 0));
    }
    /** Проверка, что есть победитель */
    get _isDone(): boolean {
       return this._isHorizontalDone;
    }
 
    /** Проверка горизонтального выигрышного заполнения */
    get _isHorizontalDone() {
       return this._field.some((row) => row.every((cell) => cell && cell === row[0]));
    }
    /** Проверка вертикального выигрышного заполнения */
    get _isVerticalDone() {
       return this._field.some((row) => row.every((cell) => cell && cell === row[0]));
    }
 }
 
 type Marker = 'o' | 'x'