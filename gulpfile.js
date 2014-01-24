/**
 * gulpfile.js
 *
 * This file is used to set up the gulp task runner
 */
var browserify = require('gulp-browserify'),
  bump = require('gulp-bump'),
  concat = require('gulp-concat'),
  git = require('gulp-git'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  gulp = require('gulp');

gulp.task('default', function () {
  gulp.run('compile');
});

gulp.task('compile', function () {
  gulp.run('scripts');
});

/**
 * scripts - used to lint and build JavaScript files
 */
gulp.task('scripts', function () {

  // run jshint on files
  gulp.src('./src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));

  gulp.src(['./src/js/root.js'])
    .pipe(browserify({
      debug: true  
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/js'))
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));

});

/**
 * save - used to save the files and push them to remote git repository
 */
gulp.task('save', ['compile'], function () {
  if (!gulp.env.m) {
    console.error('ABORTING: Commit message must be set (--m "<message>")');
    return;
  }

  // get latest changes
  gulp.src('./')
    .pipe(git.pull('origin', 'master'));

  // update the version number
  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));

  // push changes to remote git repository
  gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit(gulp.env.m))
    .pipe(git.push('origin', 'master'));
});
