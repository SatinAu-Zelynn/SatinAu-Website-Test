import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import LoadingOverlay from '../components/LoadingOverlay';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const listElRef = useRef(null);
  const postViewRef = useRef(null);
  const postCardsRef = useRef([]);

  // 加载博客列表
  useEffect(() => {
    fetch('/blog/index.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.error('加载博客列表失败:', err));
  }, []);

  // 博客卡片入场动画
  useEffect(() => {
    if (posts.length === 0) return;
    
    const observers = [];
    
    postCardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationDelay = `${0.2 + index * 0.2}s`;
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [posts]);

  // 加载单篇博客
  const loadPost = (post) => {
    setIsLoading(true);
    
    fetch(`/blog/${post.file}`)
      .then(res => res.text())
      .then(md => {
        setCurrentPost({
          ...post,
          content: marked.parse(md)
        });
        
        // 触发文章淡入动画
        if (postViewRef.current) {
          postViewRef.current.classList.remove('animate');
          void postViewRef.current.offsetWidth; // 强制重绘
          postViewRef.current.classList.add('animate');
        }
      })
      .catch(err => console.error('加载博客失败:', err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 返回列表
  const backToList = () => {
    setCurrentPost(null);
  };

  return (
    <main className="page blog-page">
      <header>
        <h1>博客 / Blog</h1>
      </header>

      <section>
        {/* 博客列表 */}
        <div 
          ref={listElRef}
          id="blogList" 
          className="contact-wrapper"
          style={{ display: currentPost ? 'none' : 'grid' }}
        >
          {posts.map((post, idx) => (
            <div
              key={idx}
              ref={el => postCardsRef.current[idx] = el}
              className="contact-card"
              onClick={() => loadPost(post)}
            >
              <div className="text">
                <div className="value">{post.title}</div>
                <div className="label">{post.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 博客详情 */}
        <div 
          ref={postViewRef}
          id="postView" 
          style={{ display: currentPost ? 'block' : 'none' }}
        >
          {currentPost && (
            <>
              <h2 id="postTitle">{currentPost.title}</h2>
              <p id="postDate" className="blog-date">{currentPost.date}</p>
              <div 
                id="postContent" 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              />
              <button 
                id="backToList" 
                className="back-btn"
                onClick={backToList}
              >
                返回列表
              </button>
            </>
          )}
        </div>
      </section>

      <footer>
        <p>
          © 2025 缎金SatinAu 保留所有权利。 
          <a href="https://www.kdocs.cn/l/chC750lu9LQC" target="_blank" rel="noopener noreferrer">问题反馈</a>
        </p>
      </footer>

      {/* 加载动画 */}
      <LoadingOverlay show={isLoading} />
    </main>
  );
};

export default BlogPage;