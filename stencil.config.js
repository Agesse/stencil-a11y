exports.config = {
  enableCache: false,
  namespace: "pea11y",
  copy: [
    {
      src: '../rating',
      dest: "rating"
    },
    {
      src: "articles"
    }
  ],
  outputTargets: [
    { type: 'www' },
    { type: 'dist' }
  ]
};
