exports.config = {
  devServer: {
    openBrowser: false,
  },
  namespace: "pea11y",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
      baseUrl:
        "https://handicap_a11y.git-scm.pole-emploi.intra/composants/Composants_JS/",
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
