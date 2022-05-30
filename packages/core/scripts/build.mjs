#!/usr/bin/env node

import babel from '@babel/cli/lib/babel/dir.js';
import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { __dirname } from './dirname.mjs';
import execSync from './execSync.mjs';

// compile via babel, either via supplied config or default
async function buildBabel (dir, type) {
  const outDir = path.join(process.cwd(), `build${type === 'esm' ? '' : '-cjs'}`);

  await babel.default({
    babelOptions: {
      configFile: type === 'esm'
        ? path.join(__dirname, '../config/babel-config-esm.cjs')
        : path.join(__dirname, '../config/babel-config-cjs.cjs')
    },
    cliOptions: {
      extensions: ['.ts', '.tsx'],
      filenames: ['src'],
      ignore: '**/*.d.ts',
      outDir,
      outFileExtension: '.js'
    }
  });

  // rewrite a skeleton package.json with a type=module
  if (type !== 'esm') {
    [
      ...CPX,
      `../../build/${dir}/src/**/*.d.ts`,
      `../../build/packages/${dir}/src/**/*.d.ts`
    ].forEach((s) => copySync(s, 'build'));
  }
}

async function main () {
  // execSync('yarn polkadot-dev-clean-build');

  execSync('yarn build');
  await buildBabel(dir, 'cjs');
  await buildBabel(dir, 'esm');
}

main().catch((error) => {
  console.error(error);
  process.exit(-1);
});
