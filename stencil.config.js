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
    },
    {
      src: "../node_modules/prismjs",
      dest: "prismjs"
    }
  ],
  outputTargets: [
    { type: 'www' },
    { type: 'dist' }
  ]
};
