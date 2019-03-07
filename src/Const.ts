/// <amd-module name='src/Const' />
export const MSG = {
    GAME: {
        LOADED: 'Загружена сохраненная игра',
        NEW: 'Новая игра',
        CHAMPION: (champion) => `Победитель ${champion}!`,
        NO_CHAMPION: 'Ничья!',
    },
};

export const ERROR = {
    GAME: {
        WRONG_PLAY_SEQ: 'Очередь другого игрока! Ход игнорируется.',
        HAVE_CHAMPION: 'В этой игре уже есть победитель!',
    },
    FIELD: {
        WRONG_MARKER: (char, values) => `Недопустимое значение '${char}'. Возможные значения ${values}`,
        OUT_OF_RANGE: (length) => `Выход за границы поля ${length}x${length}`,
        INCORRECT_RANGE: (length) => `Некорректный размер поля '${length}'!`,
        INCORRECT_FIELD: 'field должен быть двумерным массивом!',
        CELL_FILLED: (char) => `Ячейка занята символом ${char}!`,
        FULLFILLED: 'Поле заполнено!',
    },
};
