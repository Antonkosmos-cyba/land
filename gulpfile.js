const {src, dest, series, watch} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const imagemin = require ('gulp-imagemin')
const del = require('del')
const sync = require('browser-sync').create()
// import imagemin from 'gulp-imagemin';
function html(){
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
    }))
    .pipe(htmlmin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
}

function scss() {
    return src('src/scss/index.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(csso())
    .pipe(concat('index.css'))
    .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}

function ImageMin() {
    return src('src/images/**/*.{jpg,gif,png,svg}',
    '!src/images/sprite/*')
    
    .pipe(imagemin(
    [
    imagemin.gifcycle({interlaced: true}),
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.svgo({
    plugins: [
    {removeViewBox: true},
    {cleanupIDs: false}
    ]
    })
    ]
    ))
    .pipe(dest('dist/images')); 
    }

function serve() {
    sync.init({
        server: './dist'
    })
    watch('src/**/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}
exports.build = series(clear, scss, html, ImageMin)
exports.serve = series(clear, scss, html, ImageMin, serve)
exports.clear = clear