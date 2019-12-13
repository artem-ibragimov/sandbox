/// <amd-module name='src/parser' />
import { createCounter } from 'src/counter';
import { ignoreIf } from 'src/filter';
import { createIsLenLess, createIsOneOf, isHashTag, isHtmlTag, isWord } from 'src/predicate';
const STRING_DEFAULT_CFG: IConfig<string> = {
    maxWordLength: 2,
    forbidden: ['global vars', 'mutable state', 'side effects']
};
interface IConfig<T> {
    maxWordLength: number;
    forbidden: T[];
}

export default function (str: string, cfg = {}, callback: (res, err: Error) => void) {
    if (!str) {
        callback({}, new Error('First argument is invalid!'));
    }
    parseStrings(str.split(' '), { ...STRING_DEFAULT_CFG, ...cfg })
        .then((res) => { callback(res, null); })
        .catch((e: Error) => callback(null, e));
}

function parseStrings(elems: string[], cfg: IConfig<string>) {
    const { maxWordLength, forbidden } = cfg;

    const isShortWord = createIsLenLess(maxWordLength);
    const isForbidenWord = createIsOneOf(forbidden);

    const countHashTags = createCounter('hashtags')([isHashTag]);
    const countWords = createCounter('wordstags')([isWord]);

    return Promise.resolve(elems)
        .then(ignoreIf([isHtmlTag, isShortWord, isForbidenWord]))
        .then((filtered) => Promise.all([
            countHashTags(filtered),
            countWords(filtered)
        ]))
        .then((counts) => Object.assign(...counts));
}