/* eslint-disable*/
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {exec} = require('child_process');
const Dist = path.resolve(__dirname, './www/dist');
const isDev = process.argv[3] === 'development';
let ls;

module.exports = {
    entry: {
        app: './app/app.js',
    },
    output: {
        path: Dist,
        filename: 'build.js'
    },
    devtool: isDev && 'eval-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.(htm)$/,
            use: {
                loader: 'html-loader'
            }
        },{
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }, {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              loader: 'url-loader'
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        alias: {
            // Env: path.resolve(__dirname, "env/"),
            // Src: path.resolve(__dirname, "src/"),
        }
    },
    plugins: [
        new VueLoaderPlugin()
      ],
    watchOptions: {
        ignored: ['node_modules']
    }
};

if (isDev) {
    // const server = exec('nodemon bin --watch bin --ignore');
    // server.stdout.on('data', data => console.log('\x1b[35m', '[Server:]', data.replace('\n', ''), '\x1b[0m'));

    // const ts = exec('tsc --watch');
    // ts.stdout.on('data', data => console.log('\x1b[36m', '[TS:]', data.replace('\n', ''), '\x1b[0m'));
}
