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
  },
  'extends': [
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  'parserOptions': {
    'sourceType': 'module',
    'ecmaVersion': 2020,
  },
  'plugins': [
    'react-hooks',
  ],
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Basic settings
    'indent':               ['warn', 2],                // Indent with 2 spaces
    'no-trailing-spaces':   ['warn'],                   // Don't allow trailing spaces
    'semi':                 ['warn', 'always'],
    'semi-style':           ['error', 'first'],         // If necessary, write semicolon at the beginning of the line

    // Code settings
    'no-use-before-define': ['error'],                  // Define functions, classes and variables before you use them
    'no-var':               ['warn'],                   // Don't allow var
    'prefer-const':         ['warn', { 'ignoreReadBeforeAssign': true }],  // If let is not assigned to, prefer const
    'no-return-assign':     ['error', 'always'],        // Don't allow assingment in return statement

    // Spacing settings
    'space-before-blocks':  ['warn'],                   // Require at least one preceding space before blocks
    'keyword-spacing':      ['warn'],                   // Reqiure spacing around keywords
    'func-call-spacing':    ['error', 'never'],         // Don't allow spaces between function call and arguments
    'space-before-function-paren': ['error', 'never'],  // Don't allow spaces before function definition parenthesis
    'spaced-comment':       ['warn', 'always'],         // Require whitespace after //
    'space-in-parens':      ['warn', 'never'],          // Don't allow spaces in parenthesis
    'comma-spacing':        ['warn'],                   // Reqire space after comma, don't allow space before
    'space-infix-ops':      ['warn'],                   // Require spaces around infix operators (including =)
    'quotes':               ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true }],
  },
};
