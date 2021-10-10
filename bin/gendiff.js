#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();
program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepathA> <filepathB>')
  .option('-f, --format <type>', 'output format')
  .action((filePathA, filePathB) => {
    const result = genDiff(filePathA, filePathB);
    console.log(result);
  });

program.parse();
