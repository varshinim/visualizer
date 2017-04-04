var 
	gulp = require('gulp'),
	devBuild = (process.env.NODE_ENV !== 'production'),
	newer = require('gulp-newer'),
	htmlclean = require('gulp-htmlclean'),
	concat = require('gulp-concat'), //concat to single file
	deporder = require('gulp-deporder'), //reorder JavaScript or CSS files in the stream
	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
  
  folder = {
    src: 'resources/',
    build: 'dist/'
  };


gulp.task('build', function() {
	sequence('clean')
});

// clean dist
gulp.task('clean', function(){
	
});

// build js
gulp.task('js', function(cb) {
	var jsbuild = folder.build + 'js/',
	jssrc = gulp.src(folder.src + 'js/**/*')
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
	var postCssOpts = [
       assets({ loadPaths: ['images/'] }),
       autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
       mqpacker
       ];

    if (!devBuild) {
     postCssOpts.push(cssnano);
    }

    return gulp.src(folder.src + 'scss/main.scss')
     .pipe(sass({
       outputStyle: 'nested',
       imagePath: 'images/',
       precision: 3,
       errLogToConsole: true
    }))
     .pipe(postcss(postCssOpts))
     .pipe(gulp.dest(folder.build + 'css/'));
});

//build js
gulp.task('html', function(cb) {
	var htmlbuild = folder.build + 'templates/',
    htmlsrc = gulp.src(folder.src + 'templates/**/*')
      .pipe(newer(htmlbuild));

	  // minify production code
	if (!devBuild) {
    htmlsrc = htmlsrc.pipe(htmlclean());
	}
	
   return htmlsrc.pipe(gulp.dest(htmlbuild));
});

gulp.task('js:inject', function(){
	
});

gulp.task('css:inject', function(){
	
});
