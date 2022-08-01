import fs from 'fs';
import path from 'path';
import tree from './tree.js';
import format from './format.js';

const getPath = (file) => path.resolve(process.cwd(), file);
// const getFileExt = (file) => path.extname(file).slice(1);

const getFileContent = (file) => {
  const absPath = getPath(file);
  const content = fs.readFileSync(absPath, 'utf8');
  // const extension = getFileExt(file);
  return JSON.parse(content);
};

const genDiff = (filepath1, filepath2) => {
  const fileContent1 = getFileContent(filepath1);
  const fileContent2 = getFileContent(filepath2);
  const diffTree = tree(fileContent1, fileContent2);
  return format(diffTree);
};

export default genDiff;
