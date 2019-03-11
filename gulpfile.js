const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()

sass.compiler = require('node-sass')

gulp.task('sass', () => {
    return gulp.src('css/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
})

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
})

gulp.task('watch', () => {
    gulp.watch('css/scss/**/*.scss', gulp.parallel('sass'))
    gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass'))