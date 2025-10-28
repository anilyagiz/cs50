var gulp = require("gulp");
var { src, dest, series, parallel, watch } = gulp;
var sass = require("gulp-dart-sass");
var cleanCSS = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync").create();
var del = require("del");

// plugin for lossy jpg compression
var imageminMozjpeg = require("imagemin-mozjpeg");

function cssCompile() {
  return src("./src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 4 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("./public/css"))
    .pipe(browserSync.stream());
}
cssCompile.displayName = "css:compile";

function cssCopy() {
  return src("./src/scss/*.css")
    .pipe(dest("./public/css"))
    .pipe(browserSync.stream());
}
cssCopy.displayName = "css:copy";

var css = parallel(cssCompile, cssCopy);
css.displayName = "css";

function jsMinify() {
  return src(["./src/js/*.js", "!./src/js/*.min.js"])
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(dest("./public/js"))
    .pipe(browserSync.stream());
}
jsMinify.displayName = "js:minify";

var js = jsMinify;
js.displayName = "js";

function copyImages() {
  return src("./src/img/**/*")
    .pipe(
      imagemin([
        imageminMozjpeg({
          quality: 90
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
      ])
    )
    .pipe(dest("./public/img"));
}
copyImages.displayName = "copy:images";

function copyFavicons() {
  return src("./src/favicons/*")
    .pipe(imagemin())
    .pipe(dest("./public/favicons"));
}
copyFavicons.displayName = "copy:favicons";

function copyFiles() {
  return src([
    "./src/*.*",
    "./src/*/*.woff",
    "./src/*/*.min.css",
    "./src/*/*.min.js",
    "!./src/**/*.html"
  ]).pipe(dest("./public/"));
}
copyFiles.displayName = "copy:files";

var copy = parallel(copyImages, copyFavicons, copyFiles);
copy.displayName = "copy";

function htmlMinify() {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./public/"))
    .pipe(browserSync.stream());
}
htmlMinify.displayName = "html:minify";

var html = htmlMinify;
html.displayName = "html";

function clean() {
  return del(["public"]);
}
clean.displayName = "clean";

function serve() {
  browserSync.init({
    server: {
      baseDir: "./public"
    },
    port: "8080"
  });

  watch("./src/scss/**/*.scss", css);
  watch("./src/scss/*.css", cssCopy);
  watch("./src/js/*.js", jsMinify);
  watch("./src/**/*.html", htmlMinify);
  watch(
    [
      "./src/img/**/*",
      "./src/favicons/*",
      "./src/*.*",
      "./src/*/*.woff",
      "./src/*/*.min.css",
      "./src/*/*.min.js"
    ],
    copy
  );
}

var build = parallel(css, js, copy, html);

exports.clean = clean;
exports.css = css;
exports["css:compile"] = cssCompile;
exports["css:copy"] = cssCopy;
exports.js = js;
exports["js:minify"] = jsMinify;
exports.copy = copy;
exports["copy:images"] = copyImages;
exports["copy:favicons"] = copyFavicons;
exports["copy:files"] = copyFiles;
exports.html = html;
exports["html:minify"] = htmlMinify;
exports.build = build;
exports.serve = series(build, serve);
exports.default = exports.serve;
