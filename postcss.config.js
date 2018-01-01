reactToolboxVariables = {
  'color-primary' : 'var(--palette-blue-500)',
  'color-primary-dark:' : 'var(--palette-blue-700)',
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
