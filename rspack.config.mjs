// @ts-check
import path from 'node:path';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from '@rspack/cli';
import {ModuleFederationPlugin} from '@module-federation/enhanced/rspack';
import {RsdoctorRspackPlugin} from '@rsdoctor/rspack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    mode: 'development',
    devtool: false,
    context: __dirname,
    entry: {
        main: './src/index.js',
    },
    output: {
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.(m|c)?js$/,
                type: 'javascript/auto',
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
                                mode: 'usage',
                                coreJs: '3',
                            },
                            isModule: 'unknown',
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
                disableHotTypesReload: true,
                disableDynamicRemoteTypeHints: true,
            },
        }),
        process.env.DOCTOR ? new RsdoctorRspackPlugin({}) : null,
    ],
    optimization: {},
});
