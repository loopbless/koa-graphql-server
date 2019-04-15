import * as fs from 'fs';
import * as path from 'path';

const TypeQuery = 'type Query';
const TypeMutation = 'type Mutation';
const schemaFiles = fs
  .readdirSync(path.join(__dirname, ''))
  .filter(file => file.endsWith('.gql'));

export const typeDefs = (() => {
  const types: any[] = [];
  const queryStr: any[] = [];
  const mutationStr: any[] = [];
  schemaFiles.forEach(file => {
    const gqlStr = fs.readFileSync(path.join(__dirname, file), 'utf8');
    const query = parseGqlString(gqlStr, TypeQuery);
    const mutation = parseGqlString(gqlStr, TypeMutation);
    types.push(query.gql);
    queryStr.push(query.query);
    mutationStr.push(mutation.query);
  });
  const typeQuery = parseGqlType(queryStr, TypeQuery);
  const typeMutation = parseGqlType(mutationStr, TypeMutation);
  typeQuery && types.push(typeQuery);
  typeMutation && types.push(typeMutation);
  return types;
})();

function parseGqlString(gql: string, start: string) {
  let index = gql.indexOf(`${start}{`);
  if (index === -1) {
    index = gql.indexOf(`${start} {`);
  }
  if (index === -1) {
    return { gql: gql, query: '' };
  }
  const suffixGql = gql.substring(index, gql.length);
  const queryString = suffixGql.substring(0, suffixGql.indexOf('}') + 1)
  return {
    gql: gql.replace(queryString, ''),
    query: queryString
  }
}

function parseGqlType(types: any[], start: string) {
  const gql = types.join('').replace(new RegExp(`${start}\\s?{`, 'g'), '').replace(/}/g, '');
  return gql?`${start} { ${gql} }`:'';
}