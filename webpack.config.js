const path =  require('path');

module.exports = {
  mode: 'development',
  entry: './src/auth.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'auth.js'
  },
  watch: true,
  devtool: 'eval-source-map'
};