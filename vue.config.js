const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    outputDir: 'dist/',

    "transpileDependencies": [
        "vuetify"
    ],

    chainWebpack: config => {

        config.optimization
            .splitChunks(false);

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{filename: 'webpack-stats.json'}]);

        config.resolve.alias
            .set('__STATIC__', 'static');

        config.devServer
            // .public('http://0.0.0.0:8080')
            .public(process.env.VUE_APP_HOST_URL)
            // .host('0.0.0.0')
            // .port(8080)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .https(false)
            .headers({"Access-Control-Allow-Origin": ["\*"]})
            },
// This can't stay as 127, it just works for local dev
    // publicPath: 'http://127.0.0.1:8080'
};
