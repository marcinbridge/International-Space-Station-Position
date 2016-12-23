
var _ = require('lodash'),
    source = require('vinyl-source-stream'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    eslint = require('gulp-eslint'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    envify = require('envify/custom'),
    karma = require('karma'),
    deps = require('./package.json'),
    compileJSX = require('gulp-compile-jsx');

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
}

function rebundle(bundler, app, production) {
    var stream = bundler.bundle();
    return stream
        .on('error', handleErrors)
        .pipe(plumber())
        .pipe(gulpif(!production, source(app + '.js')))
        .pipe(gulpif(production, source(app + '.min.js')))
        .pipe(gulpif(production, streamify(uglify())))
        .pipe(gulp.dest('./static/js/' + app + '/'));
}

function buildScript(app, opts) {
    var production = opts.production,
        noWatch = opts.noWatch,
        vendor = app === 'vendor';

    process.env.NODE_ENV = production ? 'production' : 'development';

    var b = browserify({
        entries: vendor ? [] : ['./' + app + '/app.jsx'],
        debug: false,
        cache: {},
        packageCache: {}
    });

    _.each(deps.dependencies, function (val, key) {
        if (vendor) {
            gutil.log(key + '@' + val);
            b.require(key);
        } else {
            b.external(key);
        }
    });

    var bundler = production || noWatch ? b : watchify(b);
    bundler.transform(babelify, {presets: ['es2015', 'react']}).transform(envify());
    bundler.on('update', function () {
        rebundle(bundler, app, production);
        gutil.log('Rebundle ...');
    });
    return rebundle(bundler, app, production);
}

gulp.task('clean', function () {
    return del('./static/js/');
});

gulp.task('lint', function () {
    return gulp.src(['./' + gutil.env.app + '/js/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('uglify-es5-shim', function () {
    return gulp.src('./static/js/es5-shim.js')
        .pipe(rename('es5-shim.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('build', function () {
    return buildScript(gutil.env.app, {
        production: true,
        noWatch: true
    });
});

gulp.task('watch', function () {
    return buildScript(gutil.env.app, {
        production: false,
        noWatch: gutil.env.nowatch
    });
});
