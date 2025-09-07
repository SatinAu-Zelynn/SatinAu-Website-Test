const ghpages = require('gh-pages');

ghpages.publish('build', {
  branch: 'gh-pages',
  dotfiles: true,
  history: false,   // 不保留历史记录，避免 ENAMETOOLONG
  // add: true,     // 如果你想保留历史记录，但允许覆盖文件，就用这个
}, function (err) {
  if (err) {
    console.error('部署失败:', err);
  } else {
    console.log('部署成功 🚀');
  }
});
