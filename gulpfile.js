"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync").create();

function server() {
  browserSync.init({
    server: { baseDir: "./app" },
    notify: false,
  });
}

function styles() {
  return gulp
    .src("./app/scss/**/*.scss")
    .pipe(sass({ style: "compressed" }).on("error", sass.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src([
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/slick-carousel/slick/slick.js",
      "./app/js/main.js",
    ])
    .pipe(concat("main.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./app/js"))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src("./app/images/**/*.*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              name: "removeViewBox",
              active: true,
            },
            {
              name: "cleanupIDs",
              active: false,
            },
          ],
        }),
      ])
    )
    .pipe(gulp.dest("./dist/images"));
}

function cleanDist() {
  return del("dist");
}

function build() {
  return gulp
    .src(
      ["./app/**/*.html", "./app/css/style.min.css", "./app/js/main.min.js"],
      { base: "app" }
    )
    .pipe(gulp.dest("./dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = gulp.series(cleanDist, images, build);

exports.default = gulp.parallel(server, function () {
  gulp.watch("./app/scss/**/*.scss", styles);
  gulp.watch(["./app/js/**/*.js", "!./app/js/main.min.js"], scripts);
  gulp.watch(["./app/*.html"]).on("change", browserSync.reload);
});
