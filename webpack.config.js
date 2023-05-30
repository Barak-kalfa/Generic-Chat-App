const path =  require('path');

module.exports = {
  mode: 'development',
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  watch: true,
  devtool: 'eval-source-map'
};