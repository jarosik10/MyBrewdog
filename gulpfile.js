const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const ghPages = require('gulp-gh-pages');

// compile scss into css
function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

// start server and watch file changes
// function watch() {
//     browserSync.init({
//         server: {
//             baseDir: './'
//         }
//     });
//     gulp.watch('./scss/**/**.scss', style);
//     gulp.watch('./*.html').on('change', browserSync.reload);
//     gulp.watch('./js/**/*.js').on('change', browserSync.reload);
// }

function assets(cb) {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve()
        })
    })
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch(['./src/scss/**/*.scss','./src/*.html', './src/js/**/*.js']).on('change',gulp.series(assets, browserSync.reload)) ;
}

function deploy() {
    return gulp.src('./dist/**/*').pipe(ghPages());
}

exports.style = style;
exports.build = assets;
exports.watch = watch;
exports.deploy = deploy;