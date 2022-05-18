const path  = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // <- plugin para gerar html com base em um template injetando o bundle js
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // <- plugin de fast refresh

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'eval-source-map', // <- para debugar o bundle
  entry: path.resolve(__dirname, 'src', 'index.jsx'), // <- arquivo inicial da aplciação
  output: {
    path: path.resolve(__dirname, 'dist'), // <- pasta onde será gerado o arquivo
    filename: 'bundle.js', // <- nome do arquivo
  },
  resolve: {
    extensions: ['.js', '.jsx'], // <- extensões que serão utilizadas
  },
  devServer:{ // <- precisa do webpack-dev-server instalado
    static: { directory: path.resolve(__dirname, 'dist'),}, // <- pasta onde será gerado o arquivo
    // compress: true,
    port: 3010, // default 8000
  },
  plugins: [
    new HtmlWebPackPlugin({ // <- configuração do plugin para gerar o html
      template: path.resolve(__dirname, 'public', 'index.html'),
      publicPath: '/',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(), // <- configuração do plugin para fast refresh
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx?$/, // <- extensões para aplicar regra
        exclude: /node_modules/, // <- pasta que não será aplicada a regra
        use: [
          {
            loader: require.resolve('babel-loader'), // <- loader que será aplicado
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'), // <- plugin para fast refresh
              ].filter(Boolean),
            }
          }

        ], 
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  }
}