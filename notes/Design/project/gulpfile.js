const { src, dest, series, watch } = require('gulp');
const rollup = require('rollup');
const connect = require('gulp-connect');
const gulpif = require('gulp-if');
const htmlreplace = require('gulp-html-replace');
const del = require('delete');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

function server() {
    return connect.server({
        root: 'dist',
        livereload: true
    });
}

function livereload() {
    return src('src/*.html')
    .pipe(connect.reload())
    .pipe(dest('dist/'));
}

function clean() {
    return del(['dist']);
}


function isJavaScript(file) {
    // Check if file extension is '.js'
    return file.extname === '.js';
}

function build() {
    return src(['src/*.js', 'src/*.html'])
    .pipe(gulpif(isJavaScript,
        babel({ presets: ['@babel/env'] }), 
        htmlreplace({ 'js': 'main.js'}))
    )
    .pipe(dest('dist'));
}

async function roll() {
    const bundle = await rollup.rollup({
        input: 'src/main.js',
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    });
    
    return bundle.write({
        name: 'example',
        file: 'dist/bundle.js',
        format: 'iife'
    });
}

if (process.env.NODE_ENV === 'production') {
    exports.default = series(clean, build);
} else {
    // 监听html模板和js文件的改变
    watch(['src/*.js'], { ignoreInitial: false }, series(roll, livereload));
    watch(['src/*.html'], { ignoreInitial: false }, series(livereload));
    exports.default = series(clean, server,roll);
}