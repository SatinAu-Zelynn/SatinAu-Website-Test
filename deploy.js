const ghpages = require('gh-pages');

ghpages.publish('build', {
  branch: 'gh-pages',
  dotfiles: true,
  history: false   // 关键：避免 spawn ENAMETOOLONG
}, function (err) {
  if (err) {
    console.error('部署失败:', err);
  } else {
    console.log('部署成功 🚀');
  }
});
