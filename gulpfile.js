var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

var gulpWebpack = require('gulp-webpack'),
    webpackConfig = require('./webpack.config.js');

//webpack
gulp.task('easy_webpack', function() {
    gulp.src('./es6/index.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest('./www/es6/'))
});

//启动服务
gulp.task('connect', function() {
    connect.server({
        // root:'./',
        port: process.env.port || 3000,
        livereload: true,
    })
});


gulp.task('js', function() {
    gulp.src('./www/**/*.js')
        .pipe(connect.reload())
});


gulp.task('html', function() {
    gulp.src('./www/**/*.html')
        .pipe(connect.reload())
});


gulp.task('browser-sync', function() {
    var files = [
        '**/*.html',
        '**/*.css',
        '**/*.scss',
        '**/*.js'
    ];
    browserSync.init(files, {
        server: {
            baseDir: "./www"
        }
    });
});

//监听
gulp.task('watch', function() {
    gulp.watch('./www/**/*.scss', ['testSass']);
    // gulp.watch('./www/**/*.js', ['js']);
   // gulp.watch('./www/**/*.html', ['html']);
    // gulp.watch('./www/es6/**/*.js', ['easy_webpack']);
    // gulp.watch("./www/css/*.css").on('change', browserSync.reload);
});

//编译sass
gulp.task('testSass', function() {
    return gulp.src('./www/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css'));
});

gulp.task('default', ['testSass', 'browser-sync']);
gulp.task('serve', [ 'watch', 'testSass']);


//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径