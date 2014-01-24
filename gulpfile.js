var gulp = require('gulp'),
  bump = require('gulp-bump'),
  git = require('gulp-git');

gulp.task('default', function () {
  gulp.run('compile');
});

gulp.task('compile', function () {
  gulp.run();
});

gulp.task('save', ['compile'], function () {
  if (!gulp.env.m) {
    console.error('ABORTING: Commit message must be set (--m "<message>")');
    return;
  }

  gulp.src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));

  gulp.src('./')
    .pipe(git.pull('origin', 'master'))
    .pipe(git.add())
    .pipe(git.commit(gulp.env.m))
    .pipe(git.push('origin', 'master'));
});
