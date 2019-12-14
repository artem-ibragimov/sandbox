import { assert } from 'chai';
import 'mocha';
import { ILabelCounterResult } from 'src/counter';
import parse, { IParseConfig, STRING_COLLECTOINS } from 'src/parser';

describe('src/parser', () => {
   describe('parse', () => {

      const tests: Record<string, { cfg: IParseConfig<string>; result: ILabelCounterResult; }> = {
         [`
         <div style="font-size: 14px; line-height: 21px; color: #e4e4e4" data-some1="some1" data-some2="some2">
            About John... If John goes home in monday at 10pm, I will be happy!
         </div>
         `]: {
            cfg: {
               forbidden: ['if', 'in', 'at', 'be', '‘ll'],
               minWordLength: 2,
            },
            result: {
               [STRING_COLLECTOINS.hashtags]: {},
               [STRING_COLLECTOINS.words]: {
                  'about': 1,
                  'john': 2,
                  'goes': 1,
                  'home': 1,
                  'monday': 1,
                  '10pm': 1,
                  'will': 1,
                  'happy': 1,
               },

            },
         },
      };
      Object.keys(tests).forEach((test) => {
         it(test, (done) => {
            parse(test, tests[test].cfg, (res, err) => {
               if (err) {
                  assert.fail(err);
               }
               assert.deepEqual(tests[test].result, res);
               done();
            });
         });
      });
   });
});
