const {src, dest} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const csso = require('gulp-csso')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const sync = require('browser-sync').create()

function html(){
    return src('src/**.html')
    .pipe(include({
        prefix: '@@'
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

exports.html = html
exports.scss = scss
exports.clear = clear