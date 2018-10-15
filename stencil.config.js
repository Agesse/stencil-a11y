exports.config = {
  enableCache: false,
  namespace: "pea11y",
  copy: [
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
