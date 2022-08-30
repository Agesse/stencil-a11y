exports.config = {
  devServer: {
    openBrowser: false,
  },
  namespace: "pea11y",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      baseUrl: "http://pe.fr",
      copy: [
        { src: "articles" },
        {
          src: "../node_modules/prismjs",
          dest: "prismjs",
        },
      ],
    },
    { type: "dist" },
  ],
};
