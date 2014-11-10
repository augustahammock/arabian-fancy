//
// Requires
//---------------------------------------------------------
var

  // Gulp plugins
  gulp    = require('gulp'),
  jade    = require('gulp-jade'),
  jshint  = require('gulp-jshint'),
  notify  = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  server  = require('gulp-express'),
  stylus  = require('gulp-stylus'),
  uglify  = require('gulp-uglify'),
  watch   = require('gulp-watch'),

  // Other misc requires
  jeet    = require('jeet'),
  nib     = require('nib'),
  path    = require('path'),
  rupture = require('rupture'),
  stylish = require('jshint-stylish'),
  sync    = require('browser-sync'),
  reload  = sync.reload
;


//
// Base directories
//---------------------------------------------------------
var
  appDir     = path.join(__dirname, '/app'),
  staticDir  = path.join(__dirname, '/public'),
  viewsDir   = path.join(appDir, '/views')
;


//
// Source directories
//---------------------------------------------------------
var sources = {
  styles      : path.join(appDir, '/styles'),
  scripts     : path.join(appDir, '/scripts'),
  fonts       : path.join(appDir, '/assets/fonts/**/*'),
  images      : path.join(appDir, '/assets/img/**/*'),
  files       : path.join(appDir, '/assets/files/**/*')
};


//
// Source files
//---------------------------------------------------------
var files = {
  stylusApp   : path.join(sources.styles, '/app.styl'),
  stylusAll   : path.join(sources.styles, '/**/*'),
  scripts     : path.join(sources.scripts, '/**/*'),
  views       : path.join(viewsDir, '/**/*')
};


//
// Destination directories
//---------------------------------------------------------
var destinations = {
  styles      : path.join(staticDir, '/css'),
  scripts     : path.join(staticDir, '/js'),
  fonts       : path.join(staticDir, '/fonts'),
  images      : path.join(staticDir, '/img'),
  files       : path.join(staticDir, '/files')
};


//
// Move static assets from /app to /public
//---------------------------------------------------------
gulp.task('assets', function() {

  gulp.src(sources.fonts)
    .pipe(gulp.dest(destinations.fonts));

  gulp.src(sources.images)
    .pipe(gulp.dest(destinations.images));

  gulp.src(sources.files)
    .pipe(gulp.dest(destinations.files));

});


//
// Stylus task
//---------------------------------------------------------
gulp.task('stylus', function() {
  return gulp.src(files.stylusApp)
    .pipe(plumber({
      errorHandler: notify.onError({
        sound: 'Purr',
        title: "Stylus Error:",
        message:  "<%= error.message %>"})
    }))
    .pipe(stylus({
      use: [nib(), jeet(), rupture()],
      sourcemap: {
        inline: true,
        sourceRoot: '.',
        basePath: destinations.styles
      },
      compress: false,
      linenos: false
    }))
    .pipe(gulp.dest(destinations.styles))
    .pipe(reload({ stream: true }));
});


//
// Javascript task
//---------------------------------------------------------
gulp.task('scripts', function() {
  return gulp.src(files.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(plumber({
      errorHandler: notify.onError({
        sound: 'Purr',
        title: "Javascript Error:",
        message:  "Line: <%= error.lineNumber %> -- <%= error.message %>"})
    }))
    .pipe(uglify())
    .pipe(gulp.dest(destinations.scripts))
    .pipe(reload({ stream: true }));
});


//
// Jade task
//---------------------------------------------------------
gulp.task('jade', function() {
  return gulp.src(files.views)
    .pipe(reload({ stream: true }));
});


//
// Watch tasks
//---------------------------------------------------------
gulp.task('watch', function() {
  gulp.watch(files.stylusAll, ['stylus', 'assets']);
  gulp.watch(files.scripts, ['scripts', 'assets']);
  gulp.watch(files.views, ['jade']);
});


//
// Start the Browser Sync server
//---------------------------------------------------------
gulp.task('sync', function() {
  sync({
    proxy: 'localhost:9999',
    debugInfo: false,
    open: false
  })
});


//
// Run our local express app
//---------------------------------------------------------
gulp.task('server', function() {
  server.run({
    file: 'app.js'
  });
});


//
// The big deal
//---------------------------------------------------------
gulp.task('default', ['assets', 'stylus', 'scripts',  'server', 'sync', 'watch']);
