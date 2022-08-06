// @ts-check
import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/g-Diff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const expectedFile1 = readFile('correct1.txt').slice(0, -1);
const file1 = `${process.cwd()}/__fixtures__/file1.json`;
const file2 = `${process.cwd()}/__fixtures__/file2.json`;

test('gendiff flat file', () => {
  const result = gendiff(file1, file2);
  expect(result).toEqual(expectedFile1);
});
