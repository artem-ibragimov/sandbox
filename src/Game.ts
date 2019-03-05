/// <amd-module name='src/Game' />
import Field, { Marker } from "src/Field";

export default class Game {
    private field: Field;
    constructor() {
        this.field = new Field(3)
        console.log('Игра начинается');
    }
    set(marker: Marker, row: number, column: number) {
        try {
            this.field.set(marker, row, column);
        } catch (e) {
            console.error(e);
        }
        this.field.print();
        if (this.field.isDone){
            console.log(`Победитель ${marker}!`);
            return;
        }
        if (this.field.isFull){
            console.log('Поле заполенно, конец игре...');
        }
    }
    end(){
        this.field.print();
    }
}

