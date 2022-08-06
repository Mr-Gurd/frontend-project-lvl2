// @ts-check

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/g-Diff.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

// const extencions = ['.json', '.yml', '.yaml'];

const expectedFile1 = readFile('correct1.txt').slice(0, -1);
const file1Json = `${process.cwd()}/__fixtures__/file1.json`;
const file2Json = `${process.cwd()}/__fixtures__/file2.json`;
const file1Yml = `${process.cwd()}/__fixtures__/file1.yaml`;
const file2Yml = `${process.cwd()}/__fixtures__/file2.yaml`;
const file1Txt = `${process.cwd()}/__fixtures__/file1.txt`;
const file2Txt = `${process.cwd()}/__fixtures__/file2.txt`;

test('flat json', () => {
  const result = gendiff(file1Json, file2Json);
  expect(result).toEqual(expectedFile1);
});

test('flat yaml', () => {
  const result = gendiff(file1Yml, file2Yml);
  expect(result).toEqual(expectedFile1);
});

test('parsers wrong extension', () => {
  const error = new Error("Extension: 'txt' not supported.");
  expect(() => {
    gendiff(file1Txt, file2Txt);
  }).toThrow(error);
});
