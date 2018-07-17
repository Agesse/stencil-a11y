exports.config = {
  namespace: 'pea11y',
  copy: [
    {
      src: "../../../assets",
      dest: "assets"
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
