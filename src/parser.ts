/// <amd-module name='src/parser' />
import { createCounter, countAll } from 'src/counter';
import { ignoreIf } from 'src/filter';
import { createIsLenLess, createIsOneOf, isHashTag, isHtmlTag, isWord } from 'src/predicate';

export default function (str: string, cfg = {}, callback: (res, err: Error) => void) {
    if (!str) {
        callback({}, new Error('First argument is invalid!'));
    }
    const data = Promise.resolve(str.split(' '));
    const STRING_DEFAULT_CFG: IParseConfig<string> = {
        minWordLength: 2,
        forbidden: ['global vars', 'mutable state', 'side effects']
    };
    parseStrings(data, { ...STRING_DEFAULT_CFG, ...cfg })
        .then((res) => { callback(res, null); })
        .catch((e: Error) => callback(null, e));
}

function parseStrings(elems: Promise<string[]>, cfg: IParseConfig<string> = {}) {
    const { minWordLength, forbidden = [] } = cfg;

    const isShortWord = createIsLenLess(minWordLength);
    const isForbidenWord = createIsOneOf(forbidden);

    const countHashTags = createCounter(STRING_COLLECTOINS.hashtags)([isHashTag]);
    const isNotHashTag = (s) => !isHashTag(s);
    const countWords = createCounter(STRING_COLLECTOINS.words)([isWord, isNotHashTag]);

    return Promise.resolve(elems)
        .then(ignoreIf([isHtmlTag, isShortWord, isForbidenWord]))
        .then((filtered) =>
            countAll([
                countHashTags(filtered),
                countWords(filtered)
            ]));
}
enum STRING_COLLECTOINS {
    words = 'words',
    hashtags = 'hashtags'
}
export { parseStrings, STRING_COLLECTOINS };

interface IParseConfig<T> {
    minWordLength?: number;
    forbidden?: T[];
}