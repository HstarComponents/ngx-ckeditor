const gulp = require('gulp');
const fs = require('fs');
const shelljs = require('shelljs');

/* -------- 构建 Lib --------- */

gulp.task('build:ngx-ckeditor', (done) => {
  shelljs.exec('npm run build:ngx-ckeditor');
  done();
});

gulp.task('postbuild:lib', () => {
  return gulp.src(['./*.md']).pipe(gulp.dest('dist/ngx-ckeditor'));
});

gulp.task('build:lib', gulp.series('build:ngx-ckeditor', 'postbuild:lib'));

/* -------- 构建 Lib End --------- */

/* -------- 构建 Demo --------- */

gulp.task('build:ngx-ckeditor-examples', (done) => {
  shelljs.exec('npm run build:ngx-ckeditor-examples');
  done();
});

gulp.task('postbuild:demo', (done) => {
  const indexFilePath = './docs/index.html';
  const indexContent = fs.readFileSync(indexFilePath, 'utf-8');
  fs.writeFileSync(
    indexFilePath,
    indexContent
      .replace('base href="/"', 'base href="/ngx-ckeditor/"')
      .replace('/assets/ckeditor/', '/ngx-ckeditor/assets/ckeditor/'),
    'utf-8'
  );
  done();
});

gulp.task('build:demo', gulp.series('build:ngx-ckeditor-examples', 'postbuild:demo'));

/* -------- 构建 Demo End --------- */
