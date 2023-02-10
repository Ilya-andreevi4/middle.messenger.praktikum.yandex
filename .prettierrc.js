module.exports = {
    semi: false,
    arrowParens: 'always',
    singleQuote: true,
    trailingComma: 'es5',

    overrides: [
      {
        files: '*.hbs',
        options: {
          singleQuote: false,
        },
      },
    ],
  }