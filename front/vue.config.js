const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000/api",
        changeOrigin: true,
        pathRewrite: {
          "^api": "",
        },
      },
    },
  },
  outputDir: "../back/public",
});
