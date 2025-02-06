const { defineConfig } = require("@vue/cli-service");
// const JavaScriptObfuscator = require("webpack-obfuscator");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      //API_WEATHER
      "/swtapi": {
        target: "https://swtapi.tohapp.com",
        changeOrigin: true,
        pathRewrite: { "^/swtapi": "" },
      },
      //API_IP_FIND
      "/ipfind": {
        target: "https://ipfind.co",
        changeOrigin: true,
        pathRewrite: { "^/ipfind": "" },
      },
      //API_AQI
      "/airapi": {
        target: "https://airapi.tohapp.com",
        changeOrigin: true,
        pathRewrite: { "^/airapi": "" },
      },
      //API_RADAR
      "/sradar": {
        target: "https://sradar.tohapp.com",
        changeOrigin: true,
        pathRewrite: { "^/sradar": "" },
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // plugins: [
    //   new JavaScriptObfuscator(
    //     {
    //       rotateStringArray: true,
    //     },
    //     ["**/excluded_file.js"]
    //   ), // specify files or patterns to exclude from obfuscation if needed
    // ],
  },
});
