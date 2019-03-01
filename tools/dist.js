// const { green, cyan, red } = require('chalk');
// const webpack = require('webpack');
// const path = require('path');
// const fse = require('fs-extra');
// const execa = require('execa');
// const getConfig = require('./dist.webpack.config');
// const targets = process.argv.slice(2);
// const srcRoot = path.join(__dirname, '../src');
// const libRoot = path.join(__dirname, '../lib');
// const distRoot = path.join(libRoot, 'dist');
// const clean = () => fse.existsSync(libRoot) && fse.remove(libRoot);

// const step = (name, root, fn) => async () => {
//   const timer = new Date()
//   console.log(cyan('Building: ') + green(name));
//   await fn();
//   console.log(cyan('Built: in') + green(name));
//   console.log((new Date() - timer) + 'ms')
// };

// const shell = cmd => execa.shell(cmd, { stdio: ['pipe', 'pipe', 'inherit'] });

// const has = t => !targets.length || targets.includes(t);

// const buildDist = step(
//   'browser distributable',
//   distRoot,
//   () =>
//     new Promise((resolve, reject) => {
//       webpack(
//         [getConfig(distRoot, false), getConfig(distRoot, true)],
//         async (err, stats) => {
//           if (err || stats.hasErrors()) {
//             reject(err || stats.toJson().errors);
//             return;
//           }

//           resolve();
//         },
//       );
//     }),
// );

// console.log(
//   green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
// );


// buildDist()
