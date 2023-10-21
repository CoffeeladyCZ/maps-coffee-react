module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'i18next/languages': ['en', 'cz']
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:i18next/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2020,
  },
  'plugins': [
    'react-hooks',
    'i18next',
  ],
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Basic settings
    'indent':               ['warn', 2],                // Indent with 2 spaces
    'no-trailing-spaces':   ['warn'],                   // Don't allow trailing spaces

    // Code settings
    'no-var':               ['warn'],                   // Don't allow var
    'prefer-const':         ['warn', { 'ignoreReadBeforeAssign': true }],  // If let is not assigned to, prefer const
    'no-return-assign':     ['error', 'always'],        // Don't allow assingment in return statement
    'i18next/no-literal-string': 2
  },
};
