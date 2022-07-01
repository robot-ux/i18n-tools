const fs = require('fs');
const path = require('path');
const glob = require('glob');
const colors = require('colors')

const src = path.join(__dirname, 'i18n');
const dist = path.join(__dirname, 'dist');

if(!fs.existsSync(dist)) {
  fs.mkdirSync(dist)
}

const jsonToCsv = (file) => {
  const content = fs.readFileSync(file, 'utf-8');
  const obj = JSON.parse(content);
  let result = 'key_(variant),string_content,instruction,max_length';

  Object.keys(obj).forEach(k => {
    result += `\n"${k}","${obj[k]}","${obj[k]}"`;
  })

  const distName = `${path.basename(file, path.extname(file))}.csv`;
  fs.writeFileSync(path.join(dist, distName), result, { encoding: 'utf-8' });

  console.info(`Successfully convert ${colors.cyan(path.basename(file))} => ${colors.cyan(distName)}`)
  return result;
}

glob('*.json', { cwd: path.join(src), absolute: true }, (err, files) => {
  files.forEach(jsonToCsv)
});

