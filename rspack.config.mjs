// @ts-check
import path from 'node:path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from '@rspack/cli';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    mode: 'development',
    devtool: false,
    context: __dirname,
    entry: {
        main: './src/index.js',
    },
    resolve: {
        // conditionNames: ['import'],
    },
    output: {
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(?:m|c)?js$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'node_modules', '@module-federation'),
                ],
                use: [
                    {
                        loader: 'builtin:swc-loader',
                        /** @type {import('@rspack/core').SwcLoaderOptions} */
                        options: {
                            jsc: {
                                parser: {
                                    syntax: 'ecmascript',
                                    jsx: true,
                                },
                                transform: {
                                    react: {
                                        runtime: 'automatic',
                                        useBuiltins: true,
                                    },
                                },
                            },
                            env: {
                                targets: {chrome: '55'},
                                // Change to 'entry' would fix JavaScript parse error.
                                mode: 'usage',
                                coreJs: '3',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'wap',
            shared: {
                react: {
                    singleton: true,
                    requiredVersion: '>=19',
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: '>=19',
                },
            },
            dev: {
                disableLiveReload: true,
                disableDynamicRemoteTypeHints: true,
            },
        }),
    ],
    optimization: {},
});
