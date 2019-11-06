const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
/**
 * Load the config based on the target ( dev | prod)
 * @param {Object} env - Environment variable
 */
const modeConfig = env => require(`./webpack/webpack.${env.mode}`)(env);

// Common webpack configuration
const common = {
    entry: './src/dataParser.ts',
    module: {
        rules:[
                {
                    test: /\.js||.ts$/, //Regular expression 
                    exclude: /(node_modules|bower_components)/,//excluded node_modules 
                    use: {
                    loader: "babel-loader", 
                    options: {
                        presets: ["@babel/preset-env"]  //Preset used for env setup
                    }
              }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    plugins: [
        new webpack.ProgressPlugin()        
    ],
    externals: {
    },
    output: {
        libraryTarget: 'umd',
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};

module.exports = (mode = "production") => {
    return webpackMerge(common, modeConfig(mode));
};
