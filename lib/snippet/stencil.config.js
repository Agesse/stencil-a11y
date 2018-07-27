exports.config = {
  namespace: 'pea11y-snippet',
  copy: [
    {
      src: "../../../assets",
      dest: "assets"
    },
    {
      src: "../node_modules/prismjs",
      dest: "prismjs"
    }
  ],
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'www',
      serviceWorker: false
    }
  ]
};
