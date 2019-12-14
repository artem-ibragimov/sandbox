import { assert } from 'chai';
import 'mocha';
import { createIsLenLess, createIsOneOf, isHashTag, isHtmlTag, isWord } from 'src/predicate';

describe('src/predicate', () => {
   describe('isHashTag', () => {
      ['#tag', '#long_tag', '#45vds4@145'].forEach((tag) => {
         it(`${tag} is hash tag`, () => { assert.isTrue(isHashTag(tag)); });
      });

      ['d#tag', '#long tag', '# 45vds4@145'].forEach((tag) => {
         it(`${tag} is not hash tag`, () => { assert.isFalse(isHashTag(tag)); });
      });
   });

   describe('isHtmlTag', () => {
      ['<a>', '</a>', '<img src="" />'].forEach((tag) => {
         it(`${tag} is html tag`, () => { assert.isTrue(isHtmlTag(tag)); });
      });

      ['<b', 'word', '/>'].forEach((tag) => {
         it(`${tag} is not html tag`, () => { assert.isFalse(isHtmlTag(tag)); });
      });
   });

   describe('isWord', () => {
      ['<a>', 'word', '5'].forEach((word) => {
         it(`${word} is word`, () => { assert.isTrue(isWord(word)); });
      });

      it(`Space symbol is not word`, () => { assert.isFalse(isWord('')); });
   });

   describe('createIsLenLess', () => {
      describe('isLenLess3', () => {
         const isLenLess3 = createIsLenLess(3);
         ['', '1', '22'].forEach((s) => {
            it(`${s} length less than 3`, () => { assert.isTrue(isLenLess3(s)); });
         });
         ['333', '4444', '55555'].forEach((s) => {
            it(`${s} length bigger than 3`, () => { assert.isFalse(isLenLess3(s)); });
         });
      });
   });

   describe('createIsOneOf', () => {
      describe('isOneOf [1, 2, 3]', () => {
         const isOneOfSet = createIsOneOf([1, 2, 3]);
         [1, 2, 3].forEach((s) => {
            it(`${s} is in [1, 2, 3]`, () => { assert.isTrue(isOneOfSet(s)); });
         });
         [4, 5, 0].forEach((s) => {
            it(`${s} is not in [1, 2, 3]`, () => { assert.isFalse(isOneOfSet(s)); });
         });
      });
   });
});
