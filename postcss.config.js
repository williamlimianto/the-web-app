module.exports = {
  // NOTE: We cannot use the array form (like ['tailwindcss', 'postcss-preset-env'])
  //       since we have conditional for cssnano.
  //       (using array form will cause an unexpected error: Invalid PostCSS Plugin found: [0])
  plugins: {
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
  },
};
