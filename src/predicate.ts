/// <amd-module name='src/predicate' />

export const isHashTag: IPredicate<string> = (s) => s[0] === '#' && !s?.includes(' ');
export const isHtmlTag: IPredicate<string> = (s) => s[0] === '<' && s.length && s[s.length - 1] === '>';
export const isWord: IPredicate<string> = (s) => s?.length !== 0;
/**
 * Creates predicate to filter words with length less than `l`
 * @param maxLength - max word's length
 */
export const createIsLenLess = (maxLength: number): IPredicate<string> => (s) => maxLength && s.length < maxLength;
/**
 * Creates predicate to filter words of collection
 * @param c - words collection
 */
export const createIsOneOf = <T>(c: ICollection<T>): IPredicate<T> => (s) => c.includes(s);

export type IPredicate<T> = (s: T) => boolean;

export interface ICollection<T> {
   includes: (s: T) => boolean;
}
