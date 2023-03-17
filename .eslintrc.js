module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'no-param-reassign': 0,
        'import/prefer-default-export': 0,
        'no-console': 0,
    },
};
