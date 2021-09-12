"use strict"

const gulp = require(`gulp`)
const eslint = require(`gulp-eslint`)
const childProcess = require(`child_process`)

gulp.task(
  `eslint`,
  gulp.series(() =>
    gulp
      .src(`./src/**/*.js`)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  )
)

gulp.task(
  `watch`,
  gulp.series(() => gulp.watch(`./src/**/*.js`, gulp.series(`eslint`)))
)

gulp.task(`server`, () => {
  const cp = childProcess.spawn(`node`, [`./server.js`])

  cp.stdout.on(`data`, function (data) {
    console.log(data.toString())
  })

  cp.stderr.on(`data`, function (data) {
    console.log(data.toString())
  })
})

// gulp.task(`default`, gulp.series(gulp.parallel(`watch`, `server`)))
gulp.task(`default`, gulp.series(gulp.parallel(`server`)))
