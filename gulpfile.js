'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint')

gulp.task('eslint', () => {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('default', ['eslint'], () => {
  gulp.watch('./src/**/*.js', ['eslint'])
})
