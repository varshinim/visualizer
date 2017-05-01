var 
	gulp = require('gulp'), //reference gulp module
	devBuild = (process.env.NODE_ENV !== 'production'), // sets a devBuild variable to true when running in development mode
	Q = require('q'),
	concat = require('gulp-concat'), //concat to single file
	deporder = require('gulp-deporder'), //reorder JavaScript or CSS files in the stream
	stripdebug = require('gulp-strip-debug'), //removes all console and debugging statements
	uglify = require('gulp-uglify'), // minimize code
	inject = require('gulp-inject'), //read file and inject
	del = require('del'),
	sequence = require('run-sequence'),
    //folders
    folder = {
	    src: 'resources/',
	    build: 'public/'
	};

// clean dist
gulp.task('clean', function(){
	return del(['public/*']);
});

//build css
gulp.task('images', function(cb) {
   return gulp.src('static/images/**/*')
     .pipe(gulp.dest(folder.build + 'static/images'));
});

// build js
gulp.task('js', function(cb) {
	var jsbuild = folder.build + 'static/js/',
	jssrc = gulp.src('static/js/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jssrc = jssrc
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jssrc.pipe(gulp.dest(jsbuild));
});

//build css
gulp.task('css', function(cb) {
    if (!devBuild) {
     postCssOpts.push(cssnano);
    }

    return gulp.src('static/css/**/*')
     .pipe(concat('base.css'))
     .pipe(gulp.dest(folder.build + 'static/css/'));
});

gulp.task('html', function(cb) {
    return gulp.src('templates/base.html')
     .pipe(concat('base.html'))
     .pipe(gulp.dest(folder.build + 'templates'));
});

var injectJS = function () {
	var defer = Q.defer();
	var stream = gulp.src('public/templates/base.html')
    .pipe(inject(gulp.src(folder.build + 'static/js/*.js', {read: false}), {ignorePath: 'public'}))
    .pipe(gulp.dest(folder.build + 'templates'));
	stream.on('end', function() {
		defer.resolve(stream);
	});
	return defer.promise;
}

// inject js
gulp.task('js:inject', function(){
	return injectJS();
});

var injectCSS = function () {
	var defer = Q.defer();
	var stream = gulp.src('public/templates/base.html')
    .pipe(inject(gulp.src(folder.build + 'static/css/*.css', {read: false}), {selfClosingTag: true, ignorePath: 'public'}))
    .pipe(gulp.dest(folder.build + 'templates'));
	stream.on('end', function() {
		defer.resolve(stream);
	});
	return defer.promise;
}

// inject css
gulp.task('css:inject', function(){
	return injectCSS();
});

gulp.task('build', function() {
	sequence('clean', ['html', 'css', 'js', 'images'], 'css:inject', 'js:inject');
});

gulp.task('build:watch', function() {
	gulp.watch('static/images/*', ['images']);
	gulp.watch('static/css/*.css', ['css', 'css:inject']);
	gulp.watch('static/js/*.js', ['js', 'js:inject']);
	gulp.watch('templates/*.html', ['build']);
});




