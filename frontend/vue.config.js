const { defineConfig } = require("@vue/cli-service");
const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: ["quasar"],
  publicPath: "./",
  outputDir: "../public",
  devServer: {
    port: 4001,
  },

  pluginOptions: {
    i18n: {
      locale: "pl",
      fallbackLocale: "pl",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
    quasar: {
      importStrategy: "kebab",
    },
  },
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        additionalData: '@import "./src/assets/styles/variables.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin("InjectManifest").use(InjectManifest, [
      {
        swSrc: "./src/service-worker.js",
      },
    ]);
    config.module.rules.delete("svg");

    config.module
      .rule("svg-color")
      .test(/-color\.svg$/)
      .oneOf("component")
      .resourceQuery(/component/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ removeDimensions: true }],
        },
      })
      .end()
      .end()
      .oneOf("resource")
      .type("asset/resource");

    config.module
      .rule("svg")
      .test(/^((?!-color).)*\.svg$/)
      .oneOf("component")
      .resourceQuery(/component/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader")
      .options({
        svgo: {
          plugins: [{ removeDimensions: true }, { removeAttrs: { attrs: ["fill", "stroke"] } }],
        },
      })
      .end()
      .end()
      .oneOf("resource")
      .type("asset/resource");
  },
});
