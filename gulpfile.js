const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile SASS
gulp.task('sass', function(){
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'main/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("main/css"))
    .pipe(browserSync.stream());
});

// Move JS Files to SRC
gulp.task('js', function(){
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js'])
    .pipe(gulp.dest("main/js"))
    .pipe(browserSync.stream());
});

// Watch SASS & Serve
gulp.task('serve', ['sass'], function(){
  browserSync.init({
    server: "./main"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'main/scss/*.scss'], ['sass']);
  gulp.watch("main/*.html").on('change', browserSync.reload);
});

// Move Font Awesome Fonts folder to src
gulp.task('webfonts', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest("main/webfonts"));
});

// Move font awesome css file
gulp.task('fa', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css')
    .pipe(gulp.dest("main/css"));
});
gulp.task('fas', function(){
  return gulp.src('node_modules/@fortawesome/fontawesome-free/css/all.css')
    .pipe(gulp.dest("main/css"));
});


gulp.task('default', ['js', 'serve', 'fa', 'fas', 'webfonts']);
