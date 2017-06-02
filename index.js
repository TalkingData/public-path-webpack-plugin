const fs = require('fs-extra');

function PublicPath(options) {
  // Configure your plugin with options...
  this.publicPath = options.publicPath;
  this.grayPath = options.grayPath;
}

PublicPath.prototype.apply = function(compiler) {
  const self = this;
  compiler.plugin("done", function(stats) {

    const files = Object.keys(stats.compilation.assets);
    console.log(files);
    const hash = stats.compilation.hash;

    // callback();
    const baseDir = process.cwd();

    console.log(this.publicPath, this.grayPath);

    const cssFile = files.find((v) => /\.css$/.test(v));
    const cssGrayFile = cssFile.replace('.css', '.gray.css');

    fs.copy(
      `${baseDir}/dist/${cssFile}`,
      `${baseDir}/dist/${cssGrayFile}`)
    .then(() => {
      console.log('success!')
      const str = fs.readFileSync(`${baseDir}/dist/${cssGrayFile}`, 'utf8');
      const out = str.replace(self.publicPath, self.grayPath);
      fs.writeFileSync(`${baseDir}/dist/${cssGrayFile}`, out);
    })
    .catch(err => console.error(err));

    fs.copy(
      `${baseDir}/dist/index.html`,
      `${baseDir}/dist/index.gray.html`)
    .then(() => {
      console.log('success!')
      const str = fs.readFileSync(`${baseDir}/dist/index.gray.html`, 'utf8');
      const out = str.replace(self.publicPath, self.grayPath)
      .replace(/\.css/gi, '.gray.css');
      fs.writeFileSync(`${baseDir}/dist/index.gray.html`, out);
    })
    .catch(err => console.error(err));
  });
};

module.exports = PublicPath;
