var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

gulp.task("sass", () => {
  return gulp
    .src("./src/scss/*.scss") // 입력 경로
    .pipe(sourcemaps.init())
    .pipe(sass({sourceComments: true}).on('error', sass.logError))//true 설정
    .pipe(concat('App.css'))
    .pipe(sourcemaps.write('../maps'))//전역 maps 디렉토리 생성
    .pipe(gulp.dest('./src')); // 출력 경로
});

// 런타임 중 파일 감시
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', gulp.series('sass')); // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
});

gulp.task('default', gulp.series('sass:watch'));