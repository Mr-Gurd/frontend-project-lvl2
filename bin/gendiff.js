#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import genDiff from '../src/g-Diff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference')
  .version('0.6.1', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.opts().format);
    console.log(diff);
  });

program.parse();
