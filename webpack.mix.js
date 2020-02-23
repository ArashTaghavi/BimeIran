const mix = require('laravel-mix');

mix.setPublicPath("public");

mix.webpackConfig({
    devtool: 'inline-source-map'
});

mix.react('resources/js/index.js', 'js/app.js')
    .sass('resources/sass/app.scss', 'css/app.css')
    .react('resources/js/admin.js', 'js/admin.js')
    .react('resources/js/marketer.js', 'js/marketer.js')
    .sourceMaps()
    .browserSync('http://localhost:8000/')
    .disableNotifications();
