const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const flatten = require("gulp-flatten");
const watch = require("gulp-watch");
const htmlmin = require("gulp-htmlmin");
const concatcss = require("gulp-concat-css");
const concat = require("gulp-concat");
const cssMinify = require("gulp-css-minify");
const minifyjs = require("gulp-js-minify");
const browsersync = require("browser-sync").create();

//Image compress
gulp.task("imagemin", function () {
  return gulp
    .src(["src/**/*{png,gif,jpg,jpeg,svg,ico}"])
    .pipe(imagemin())
    .pipe(flatten({ includeParents: 0 }))
    .pipe(gulp.dest("./build/img"));
});

//Html compress
gulp.task("minify", () => {
  return gulp
    .src("src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"));
});
// css Concat
gulp.task("cssconcat", function () {
  return gulp
    .src("src/css/**/*.css")
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./public/css"));
});
// css compess

gulp.task("minifyCss", function () {
  return gulp
    .src("./public/css/main.css")
    .pipe(cssMinify())
    .pipe(gulp.dest("./build/css"));
});
//compress js
gulp.task("minify-js", async () => {
  gulp.src("src/js/script.js").pipe(minifyjs()).pipe(gulp.dest("./build/js"));
});
gulp.task("browsersync", function () {
  browsersync.init({
    server: {
      baseDir: "./build",
    },
    port: 3000,
    notify: false,
  });
});

gulp.task("default", gulp.parallel("browsersync"));

gulp.task(
  "develop",
  gulp.series(
    "minify",
    "cssconcat",
    "minifyCss",
    "minify-js",
    "imagemin",
    "browsersync"
  )
);
