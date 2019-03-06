const requirejs = require('requirejs');
const path = require('path');
const fs = require('fs');
const unitDir = path.resolve(__dirname, 'unit');
const testSuf = '.test.js';

requirejs.config({ baseUrl: path.resolve() });

fs.readdirSync(unitDir).forEach((test) => {
   if (test.includes(testSuf)) {
      requirejs(path.join(unitDir, test));
   }
});