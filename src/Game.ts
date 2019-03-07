/// <amd-module name='src/Game' />
import { ERROR, MSG } from 'src/Const';
import Field from 'src/Field';

export default class Game {
    private field: Field;
    private lastMarker: any;
    /** Маркер победителя */
    private champion: any;
    private storage: Storage;

    /** Допустимые значения маркера */
    private markerValues = ['x', 'o'];

    constructor() {
        if (typeof localStorage !== typeof void 0 || typeof sessionStorage !== typeof void 0) {
            this.storage = localStorage || sessionStorage;
        }
        this.field = new Field(3, this.markerValues);
        (this.restore()) ? console.log(MSG.GAME.LOADED) : console.log(MSG.GAME.NEW);
    }

    set(marker, row: number, column: number): string | Error {
        try {
            this.checkPlaySeq(marker);
            this.field.set(marker, row, column);
        } catch (e) {
            return e;
        }
        this.lastMarker = marker;
        this.store();
        if (this.field.isDone) {
            this.champion = marker;
            return MSG.GAME.CHAMPION(this.champion);
        }
        if (this.field.isFull) {
            return MSG.GAME.NO_CHAMPION;
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
        if (!storagedField) { return false; }
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
    private checkPlaySeq(marker) {
        if (this.lastMarker === marker) {
            throw new Error(ERROR.GAME.WRONG_PLAY_SEQ);
        }
    }
}
