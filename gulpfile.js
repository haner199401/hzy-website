'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    pngquant = require('imagemin-pngquant'), //png图片压缩插件
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    rev_manifest_file_path = './rev-manifest.json',

    isDeploy = !0;//部署项目

var src = {
    css: 'app/assets/styles/**/*',
    img: 'app/assets/image/*.{png,jpg,gif,ico}',
    js: 'app/assets/scripts/**/*',
    tmpl: 'app/**/*.jade'
};

var dest = {
    css: 'dest/assets/styles/',
    img: 'dest/assets/image/',
    js: 'dest/assets/scripts/',
    html: 'dest/',
    rev_path:'dest/*.html',
    rev_asset:'dest/assets/**',
    out_rev_asset:'dest/assets/'
};

/**
 * 是否打印log
 * @type {boolean}
 */
var isLog = !0;

//delete dest
gulp.task('clean', require('del').bind(null, ['dest']));


//styele css
gulp.task('styles', function () {
    return gulp.src(src.css)
        .pipe($.plumber(errrHandler)) //异常处理
        .pipe($.if('*.styl',$.stylus()))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 0 versions', 'Firefox ESR', 'Opera 12.1'],cascade: false}))
        .pipe($.if(isDeploy,$.csso()))
        .pipe($.if('*.css',$.rename({suffix: '.min'})))
        .pipe(gulp.dest(dest.css));
});


// js compress uglify connact
gulp.task('scripts', function () {
    return gulp.src(src.js)
        .pipe($.plumber(errrHandler)) //异常处理
        .pipe($.if(isDeploy, $.if('*.js',$.uglify())))
        .pipe(gulp.dest(dest.js));
});


//static image 任务可优化处理
gulp.task('images', function () {
    return gulp.src(src.img)
        .pipe($.cache($.imagemin({
            progressive: true,
            use: [pngquant()]
        })))
        .pipe(gulp.dest(dest.img));
});

//jade
gulp.task('templates', function () {
    gulp.src(src.tmpl)
        .pipe($.plumber(errrHandler)) //异常处理
        .pipe($.jade())
        .pipe(gulp.dest(dest.html));
});


//reversion
gulp.task('rev',['scripts','styles','images','templates'], function () {
    return gulp.src(dest.rev_asset)
        .pipe(rev())
        .pipe(gulp.dest('./public/assets/'))
        .pipe(rev.manifest({base: dest.out_rev_asset,merge: true}))
        .pipe(gulp.dest('./public/assets/'));
});

//replace
gulp.task("revreplace", ["rev"], function(){
    return gulp.src(dest.rev_path)
        .pipe(revReplace({manifest: gulp.src(rev_manifest_file_path)}))
        .pipe(gulp.dest('./public/'));
});


//部署时添加 rev task
var task = (function(){
    var excetask = ['styles', 'images','scripts', 'templates'];
    if(isDeploy){
        excetask.push('rev');
        excetask.push('revreplace');
    }
    return excetask;
})();

//start project
gulp.task('start',task,function () {

    browserSync({
        notify: true,
        port: 8888,
        server: {
            baseDir: ['public']
        }
    });


    //watch files to run task
    gulp.watch(src.css, ['styles']);
    gulp.watch(src.js,  ['scripts']);
    gulp.watch(src.img, ['images']);
    gulp.watch(src.tmpl,['templates']);


    // watch for changes
    gulp.watch([src.js, src.css, src.tmpl]).on('change', reload);

    log('服务器启动成功!');
});


/**
 * 开发
 */
gulp.task('default', function () {
    gulp.start(['start']);
});

/**
 * 发布
 */
gulp.task('release',function(){
    isDeploy = !0;
    gulp.start(['start']);
});


/**
 * 异常捕获,避免jade编译出错时停止进程
 * @param e
 */
function errrHandler(e) {
    log(e.message);
}


function log(msg) {
    var dateStr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    isLog ? console.log('[' + dateStr + '] : ' + msg) : ''
}