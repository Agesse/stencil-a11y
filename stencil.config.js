exports.config = {
  devServer: {
    openBrowser: false,
  },
  namespace: "pea11y",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      dir: "public",
      baseUrl: "https://handicap_a11y.git-scm.pole-emploi.intra",
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
