exports.config = {
  namespace: 'pea11y-uxstars',
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
