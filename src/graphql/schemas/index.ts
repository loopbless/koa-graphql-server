import * as fs from 'fs';
import * as path from 'path';

const schemaFiles = fs.readdirSync(path.join(__dirname, ''))
  .filter(file => file.endsWith('.gql'));

export const typeDefs = (() => {
  const types: any[] = [];
  schemaFiles.forEach(file => {
    types.push(fs.readFileSync(path.join(__dirname, file), 'utf8'));
  });
  return types;
})();
