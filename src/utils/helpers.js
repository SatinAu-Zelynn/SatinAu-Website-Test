// 样式切换工具
export const applyCssVersion = (styleName) => {
  const styles = ['sainau', 'fluent', 'material'];
  styles.forEach(style => {
    const link = document.getElementById(`style-${style}`);
    if (link) link.disabled = style !== styleName;
  });
  localStorage.setItem('preferredStyle', styleName);
};

// 复制文本工具
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const input = document.createElement("textarea");
      input.value = text;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      const success = document.execCommand("copy");
      document.body.removeChild(input);
      return success;
    }
  } catch (err) {
    console.error('复制失败:', err);
    return false;
  }
};

// 页面切换动画工具
export const getPageTransitionClass = (fromPath, toPath) => {
  const ORDER = ['/', '/blog', '/zelynn'];
  const fromIdx = ORDER.indexOf(fromPath);
  const toIdx = ORDER.indexOf(toPath);
  
  if (fromIdx === -1 || toIdx === -1) return '';
  return toIdx > fromIdx ? 'slide-in-right' : 'slide-in-left';
};