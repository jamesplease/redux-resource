import path from 'path';
import { checkDirectory } from 'typings-tester';

describe('TypeScript definitions', function() {
  it('should compile against index.d.ts', function() {
    this.timeout(5000);
    checkDirectory(path.join(__dirname, '../typescript'));
  });
});
