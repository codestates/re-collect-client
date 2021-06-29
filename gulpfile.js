var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp
    .src('./src/scss/*.scss') // 입력 경로
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(concat('App.css'))
    .pipe(gulp.dest('./src')); // 출력 경로
});

// 런타임 중 파일 감시
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', gulp.series('sass')); // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
});
