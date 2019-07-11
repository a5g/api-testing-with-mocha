const gulp = require('gulp')
const del = require('del')
const run = require('gulp-run-command').default
const mocha = require('gulp-mocha')

gulp.task('clean', () => {
  return del(['target/', 'dist/'])
})

gulp.task('run:api_tests', () => {
  return gulp.src(['./test/**/*.spec.ts'], { read: false }).pipe(
    mocha({
      reporter: 'mocha-multi-reporters',
      reporterOptions: {
        configFile: 'reports-config.json',
      },
      require: ['ts-node/register', 'tsconfig-paths/register'],
      timeout: 90000,
    }),
  )
})

gulp.task('test:api', gulp.series(['clean', 'run:api_tests']))
gulp.task('test', gulp.series(['test:api']))
gulp.task('report', run('npm run allure-report'))
gulp.task('report:junit', run('npm run junit-report'))
gulp.task('default', gulp.series(['clean', 'run:api_tests']))

function defaultTask(cb) {
  // place code for your default task here
  cb()
}

exports.default = defaultTask
