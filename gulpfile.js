var gulp = require('gulp');

var cachebust = require('gulp-cache-bust');
var concat = require('gulp-concat');
var modernizr = require('gulp-modernizr');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var sort = require('gulp-sort');
var del = require('del');
var sass = require('gulp-sass');

var config = {
    paths: {
        dev: {
            html: 'public/**/*.html',
            sass: {
                global: 'public/**/global.scss',
                components: 'public/**/*.scss'
            },
            js: ['public/**/*.js', '!public/**/*.spec.js', '!public/dist/**'],
            index: 'public/root.html'
        },
        build: {
            dist: 'public/dist/'
        }
    }
};

gulp.task('sass', function () {
    return gulp.src([
            'node_modules/angular-material/angular-material.min.css',
            config.paths.dev.sass.global,
            config.paths.dev.sass.components
        ]
    )
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({
            rebaseTo: config.paths.build.dist,
            compatibility: 'ie8'
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(config.paths.build.dist));
});

gulp.task('modernizr', function () {
    return gulp.src(config.paths.dev.js)
        .pipe(modernizr('modernizr.js'))
        .pipe(gulp.dest(config.paths.build.dist));
});

gulp.task('app', function () {
    return gulp.src(config.paths.dev.js)
    // Sort files, so the cache buster calculates the same hash if there haven't been any changes.
        .pipe(sort())
        .pipe(concat('sources.js'))
        .pipe(gulp.dest(config.paths.build.dist));
});

gulp.task('templates', function () {
    return gulp.src(config.paths.dev.html)
    // Sort files, so the cache buster calculates the same hash if there haven't been any changes.
        .pipe(sort())
        .pipe(templateCache({
            root: '',
            module: 'WebMIDI'
        }))
        .pipe(gulp.dest(config.paths.build.dist));
});

gulp.task('libs', gulp.series('modernizr', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/angular-cookies/angular-cookies.min.js',

        'public//dist/modernizr.js'
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(config.paths.build.dist));
}));

gulp.task('cache-buster', gulp.parallel(['app', 'libs', 'templates', 'sass']), function () {
    return gulp.src(config.paths.dev.index)
        .pipe(cachebust({
            type: 'MD5'
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('public/'));
});

gulp.task('clean', function () {
    return del([config.paths.build.dist], {
        force: true
    });
});

gulp.task('build', gulp.series(['cache-buster']));