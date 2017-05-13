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
  externals: {
    jquery: "jQuery",
    jqueryui: "jqueryui",
    bootstrap: "bootstrap",
    handlebars: "Handlebars"
  },
  resolve: {
    extensions: [".js",".handlebars"]
  },
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
      },
      { test: /\.(jpe?g|png|gif)$/i, loader:"file-loader" },
      { test: /\.handlebars$/, loader: "handlebars-loader" }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      },
      Tether: "tether",
      "window.Tether": "tether",
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




