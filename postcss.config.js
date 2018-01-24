reactToolboxVariables = {
  'color-primary' : 'var(--palette-yellow-900)',
  'color-primary-dark:' : 'var(--palette-yellow-900)',
  'dropdown-value-hover-background' : 'var(--palette-blue-200)'
};

module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-mixins': {

    },
    'postcss-each': {

    },
    'postcss-cssnext': {
      features: {
        customProperties: {
          variables: reactToolboxVariables
        }
      }
    }
  }
};
