const gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util');
	babel = require('gulp-babel'),
	
	imagemin = require('gulp-imagemin');

gulp.task('js',function(){
	
		gulp.src('./src/js/*.js')
		.pipe(concat("all.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
	
})

gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(cssnano())
	.pipe(rename({'suffix' :'.min'}))
	.pipe(gulp.dest('./dist'))
})
gulp.task('ssr',function(){
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.on('error',function(err){
		gutil.log(gutil.colors.red('[Error'),err.toString());
	})
	.pipe(gulp.dest('./dist/js'))
})

gulp.task('ba',function(){
	gulp.src('./src/js/*.js')
	.pipe(babel())
	.pipe(gulp.dest('./dist/js'))
	
})



gulp.task('img',function(){
	gulp.src('./src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/images'))
})

gulp.task('default',function(){
	gulp.watch(['./src/sass/*.scss'],['sass'])
})
