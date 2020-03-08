//  Подключенные модули  gulp 
const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
// const svgSprites = require("gulp-svg-sprites");
const svgSprite = require("gulp-svg-sprite");
const	svgmin = require("gulp-svgmin");
const	cheerio = require("gulp-cheerio");
const	replace = require("gulp-replace");
const del = require("del");
const browserSync = require("browser-sync").create();




// Файлы для подключения в строгом порядке:

let lessFiles = [
  // Пишем все файлы, которые хотим объединить, в том порядке, в каком они будут располагаться в объединенном файле
  "./src/less/variables.less", 
  "./src/less/mixins.less", 
  "./src/less/scaffolding.less",
  "./src/less/header.less",
  "./src/less/nav.less",
  "./src/less/site-list.less",
  "./src/less/user-list.less"
];

let jsFiles = [
  // "./source/js/lib.js",
  "./source/js/main.js",
];



// TASKS
// Task на стили CSS 
function styles() {
  return gulp.src([
    // Пишем все файлы, которые хотим объединить, в том порядке, в каком они будут располагаться в объединенном файле
    "./source/less/variables.less", 
    // "./source/less/mixins.less", 
    "./source/less/scaffolding.less",
    "./source/less/header.less",
    "./source/less/nav.less",
    // "./source/less/site-list.less",
    // "./source/less/user-list.less"
  ])
  .pipe(plumber())
  .pipe(concat("style.less"))
  // .pipe(gulp.dest("./source/less")) 
  .pipe(less())
  // .pipe(concat("style.css"))  // Объединение файлов в один
  .pipe(autoprefixer({
    overrideBrowserslist:  ["last 2 versions"],
    cascade: false
  }))
  .pipe(gulp.dest("./build/css")) 
  .pipe(cleanCSS({           // Минификация css 
    level: 2
  }))  
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(browserSync.stream());
}


// Task на скрипты JS 
function scripts() {
  return gulp.src(jsFiles)
  .pipe(concat("script.js"))  // Объединение файлов в один
  .pipe(uglify({
    toplevel: true
  }))
  .pipe(gulp.dest("./build/js"))
  .pipe(browserSync.stream());
} 


// Task на функцию del
function clean() {
  return del.sync("build").then(function(cb) {
    return cache.clearAll(cb);
  });
}

// function clean() {
//   return del(["build/*"]);
// }



// Task на функцию images
function imgmin() {
  return gulp.src("source/img/**/*.{png, jpg, jpeg, gif, svg}")
  .pipe(cache( gulp.series(
      imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
      ])
  )))
    .pipe(gulp.dest("build/img"));
}

// Task на функцию webp
function webpic() {
  return gulp.src("src/img/**/*.{png, jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
}


// Task на функцию watch
function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./source/less/**/*.less", gulp.series("styles"));   // Отслеживаем файлы css 
  gulp.watch("./source/js/**/*.js", gulp.series("scripts")); 
  gulp.watch("./source/img/**/*.{png, jpg, svg}", gulp.series("imgmin"));  
  gulp.watch("./source/img/**/*.{png, jpg}", gulp.series("webp"));   // Отслеживаем файлы js 
  gulp.watch("./*.html").on("change", browserSync.reload);  //  // Отслеживаем файлы html
}



// TASKS ДЛЯ ВЫЗОВА ФУНКЦИЙ
// Task вызывающий функцию styles
gulp.task("styles", styles);

// Task вызывающий функцию scripts
gulp.task("scripts", scripts);

// Task вызывающий функцию очистки папки build 
gulp.task("del", clean);

// Task вызывающий функцию минимизации картинок
gulp.task("imgmin", imgmin); 


// Task вызывающий функцию webp
gulp.task("webp", webpic);


// Task для создания svg-спрайта Academy-модернизированный

gulp.task("sprite", function () { 
  return gulp.src("source/img/*.svg") 
  // minify svg
  .pipe(svgmin({
    js2svg: {
      pretty: true
    }
  }))
  // remove all fill and style declarations in out shapes
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
      $('[stroke]').removeAttr('stroke');
      $('[style]').removeAttr('style');
    },
    parserOptions: { xmlMode: true }
  }))
  // cheerio plugin create unnecessary string ">', so replace it.
  .pipe(replace("&gt;", ">"))

  .pipe(svgstore({ 
    inlineSvg: true 
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});




// Task для создания svg-спрайта вариант 4 
gulp.task('svgSprite', function () {
  return gulp.src('source/img/*.svg')
    .pipe(svgSprite(
      config = {
        // shape: {
        //   dimension: { // Set maximum dimensions
        //     maxWidth: 32,
        //     maxHeight: 32
        //    },
        //   spacing: { // Add padding
        //     padding: 10
        //   },
        //   dest: 'out/intermediate-svg' // Keep the intermediate files
        // },
        mode: {
          view: { // Activate the «view» mode
            bust: false,
            render: {
              less: true // Activate Sass output (with default options)
            }
          },
          symbol: true // Activate the «symbol» mode
        }
      }
    ))
    .pipe(gulp.dest("build/img/new/"));
  });

// Copying fonts

gulp.task("fonts", function() {
  return gulp.src("source/fonts/**/*")
    .pipe(gulp.dest("build/css/fonts"));
});


// Task вызывающий функцию watch
gulp.task("watch", watch);



gulp.task("build", gulp.series("del", "imgmin", "webp", "sprite", gulp.parallel("styles", "scripts", "fonts" )), function(done){
  done();
});

gulp.task("dev", gulp.series("build", "watch"));