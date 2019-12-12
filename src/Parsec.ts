/// <amd-module name='src/Game' />
import { ignoreIf } from 'src/filter';
import { isHtmlTag, createIsLenLess, createIsOneOf } from 'src/predicate';

const DEFAULT_CFG = {
    maxWordLength: 2,
    forbidden: ['global vars', 'mutable state', 'side effects']
};

export default function parse(str: string, cfg = {}, callback: (res: object, err: Error) => void) {

    if (!str) {
        callback({}, new Error('First argument is invalid!'));
    }
    const { maxWordLength, forbidden } = { ...DEFAULT_CFG, ...cfg };

    const isShortWord = createIsLenLess(maxWordLength);
    const isForbidenWord = createIsOneOf(forbidden);

    Promise.resolve(str.split(' '))
        .then(ignoreIf([isHtmlTag, isShortWord, isForbidenWord]))
        .then((filtered) => {
            // Promise.all([
            //     collectIf([isHashTag])(filtered)
            //     collectIf([isToken])(filtered)
            //     collectIf([isWord])(filtered)
            // ]);
            // collect({
            //     hashTags: isHashTag,
            //     tokens: isToken,
            //     words: isWord
            // });
        });
}

