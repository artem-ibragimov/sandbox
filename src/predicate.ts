
export const isHtmlTag: IPredicate = (s) => s[0] === '<' && s[length - 1] === '>';
export const isWord: IPredicate = (s) => s.length !== 0;
/**
 * Creates predicate to filter words with length less than `l`
 * @param maxLength - max word's length
 */
export const createIsLenLess = (maxLength: number): IPredicate => (s) => s.length < maxLength;
/**
 * Creates predicate to filter words of collection
 * @param c - words collection
 */
export const createIsOneOf = (c: string[]): IPredicate => (s) => c.includes(s);

export type IPredicate = (s: string) => boolean;