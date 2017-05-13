var webpack = require("webpack");
var path = require("path");
var ExtractTestPlugin = require("extract-text-webpack-plugin");

var production = false;
if (process.env.NODE_ENV) {
  production = (process.env.NODE_ENV.trim() === 'production') ? true : false;
}

var extractPlugin = new ExtractTestPlugin({
  filename: "main.css"
});

var entry = [];
if (!production)
{
  entry.push("webpack/hot/dev-server",
    "webpack-hot-middleware/client");
}
entry.push("./main");

module.exports = {
  context: path.join(__dirname, "app"),
  entry: entry,
  output: {
    path: path.join(__dirname, "public/assets/"),
    publicPath: "/public/assets/",
    filename: "app.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: production
          ? extractPlugin.extract({ use: ["css-loader", "sass-loader"] })
          : ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devtool: (!production) ? "#eval-source-map" : false
};

if (!production)
{

  module.exports.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
  module.exports.plugins.push(new webpack.NoErrorsPlugin());
}

if (production)
{

  module.exports.plugins.push(extractPlugin);
}




