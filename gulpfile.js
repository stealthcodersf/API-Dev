var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('default', ['style', 'inject'], function(){
    nodemon({
      script:'./bin/www',
      ext: 'js',
      env: {
          PORT: 8000
      },
      ignore: ['./node_modules/**']
    }).on('restart', function(){
       console.log('Restarting...');
    });
});

gulp.task('test', function() {
    env({vars:{ENV:'Test'}});
   gulp.src('./tests/**/*.js', {read:false}).pipe(gulpMocha({reporter:'nyan'}));
});

var jsFiles = [
    '*.js',
    './controllers/**/*.js',
    './models/**/*.js',
    './routes/**/*.js',
    './helpers/**/*.js',
    './middlewares/**/*.js',
    './tests/**/*.js'
];

gulp.task('style', function() {
   return gulp.src(jsFiles)
       .pipe(jshint())
       .pipe(jshint.reporter('jshint-stylish', {verbose:true}))
       .pipe(jscs());
});

gulp.task('inject', function() {
   var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var options = {
     bowerJson: require('./bower.json'),
     directory: './public/lib'
   };

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read:false});
    var injectOptions = {
        ignorePath: '/public/'
    };
   return gulp.src('./public/*.html')
       .pipe(wiredep(options))
       .pipe(inject(injectSrc, injectOptions))
       .pipe(gulp.dest('./public'));
});