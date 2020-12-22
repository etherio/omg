module.exports = {
  outputDir: "docs/",
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "OMG",
    themeColor: "#1976d2",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/sw.js",
    },
  },
};
