import { assert } from 'chai';
import 'mocha';
import { parseStrings, STRING_COLLECTOINS } from 'src/parser';

describe('src/parser', () => {
   describe('parseStrings', () => {

      it('parse empty set', () => {
         const data = Promise.resolve([]);
         return parseStrings(data).then((results) => {
            const { [STRING_COLLECTOINS.words]: words } = results;
            assert.deepEqual(words, {});
         });
      });

      it('parse words without config', () => {
         const data = Promise.resolve(['one', 'two', 'two']);
         return parseStrings(data).then((results) => {
            const { [STRING_COLLECTOINS.words]: words } = results;
            assert.deepEqual(words, { 'one': 1, 'two': 2 });
         });
      });

      it('parse words with length limit', () => {
         const data = Promise.resolve(['1', '22', '333', '1', '22']);
         return parseStrings(data, { minWordLength: 2 }).then((results) => {
            const { [STRING_COLLECTOINS.words]: words } = results;
            assert.deepEqual(words, { '22': 2, '333': 1 });
         });
      });

      it('parse words with forbidden set', () => {
         const data = Promise.resolve(['1', '22', '333', '1', '4444']);
         return parseStrings(data, { forbidden: ['1', '4444'] }).then((results) => {
            const { [STRING_COLLECTOINS.words]: words } = results;
            assert.deepEqual(words, { '22': 1, '333': 1 });
         });
      });

      it('parse hashtags ', () => {
         const data = Promise.resolve(['#tag', '#hash_tag', 'no_tag', ' bad#tag']);
         return parseStrings(data).then((results) => {
            const { [STRING_COLLECTOINS.hashtags]: hashtags } = results;
            assert.deepEqual(hashtags, { '#tag': 1, '#hash_tag': 1 });
         });
      });

      it('parse hashtags with length limit', () => {
         const data = Promise.resolve(['#tag', '#hash_tag', 'no_tag', ' bad#tag']);
         return parseStrings(data, { minWordLength: 5 }).then((results) => {
            const { [STRING_COLLECTOINS.hashtags]: hashtags } = results;
            assert.deepEqual(hashtags, { '#hash_tag': 1 });
         });
      });

      it('parse hashtags with forbidden set', () => {
         const data = Promise.resolve(['#tag', '#hash_tag', 'no_tag', ' bad#tag']);
         return parseStrings(data, { forbidden: ['#tag'] }).then((results) => {
            const { [STRING_COLLECTOINS.hashtags]: hashtags } = results;
            assert.deepEqual(hashtags, { '#hash_tag': 1 });
         });
      });
   });
});