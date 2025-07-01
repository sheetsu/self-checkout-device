const { defineConfig } = require("@vue/cli-service");
const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = defineConfig({
  parallel: false,
  transpileDependencies: ["quasar", "@sheetsu/sl-frontend-packages"],
  publicPath: "/",
  outputDir: "../public",
  devServer: {
    port: 4001,
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        secure: false,
      }
    }
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
    quasar: {},
  },
  css: {
    extract: false,
    loaderOptions: {
      scss: {
        additionalData: '@import "~@sheetsu/sl-frontend-packages/shared-styles/variables.scss";',
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

    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src"))
      .set("@views", path.resolve(__dirname, "./src/views"))

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
