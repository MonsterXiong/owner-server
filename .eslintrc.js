module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
        es6: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['prettier'],
    rules: {
        'no-unused-vars': 0,
        'no-console': 'off',
        'max-classes-per-file': 0,
        'import/no-dynamic-require': 0,
        'prettier/prettier': 0,
    },
}
