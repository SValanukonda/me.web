import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { blogs } from '../data/blogsData';
import './BlogPost.css';

// Extract headings from markdown for Table of Contents
function extractHeadings(markdown) {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    headings.push({ level, text, id });
  }
  return headings;
}

// Calculate reading time
function getReadingTime(text) {
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return { words, minutes };
}

// Custom heading renderer that adds IDs for anchor links
function HeadingRenderer({ level, children }) {
  const text = typeof children === 'string' ? children : 
    Array.isArray(children) ? children.map(c => typeof c === 'string' ? c : c?.props?.children || '').join('') : '';
  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const Tag = `h${level}`;
  return <Tag id={id}>{children}</Tag>;
}

function resolveAssetSrc(src = '') {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) return src;
  if (src.startsWith('/')) {
    const base = import.meta.env.BASE_URL || '/';
    return `${base.replace(/\/$/, '')}${src}`;
  }
  return src;
}

function BlogPost() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef(null);

  const headings = blog ? extractHeadings(blog.content) : [];
  const { words, minutes } = blog ? getReadingTime(blog.content) : { words: 0, minutes: 0 };

  // Highlight active TOC item on scroll and animate content
  useEffect(() => {
    if (!blog) return;

    // TOC Observer
    const tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    // Scroll Fade-In Observer
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px' }
    );

    const timer = setTimeout(() => {
      // Observe headings for TOC
      if (headings.length > 0) {
        headings.forEach(({ id }) => {
          const el = document.getElementById(id);
          if (el) tocObserver.observe(el);
        });
      }

      // Observe all markdown blocks for fade-up animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.markdown-content > *');
        elements.forEach((el, index) => {
          el.classList.add('fade-up-element');
          // Add slight stagger for elements already in view
          if (index < 5) el.style.transitionDelay = `${index * 100}ms`;
          animationObserver.observe(el);
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      tocObserver.disconnect();
      animationObserver.disconnect();
    };
  }, [blog, headings]);

  if (!blog) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="blog-post-page">
      <div className="top-nav-bar">
        <Link to="/blogs" className="back-link">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>

      <div className="blog-post-layout">
        {/* Left Sidebar: Table of Contents */}
        <aside className="toc-sidebar">
          <div className="toc-container">
            <h4 className="toc-title">TABLE OF CONTENTS</h4>
            {headings.length > 0 ? (
              <nav className="toc-nav">
                {headings.map(({ id, text, level }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`toc-link ${level === 3 ? 'toc-sub' : ''} ${activeId === id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {text}
                  </a>
                ))}
              </nav>
            ) : (
              <p className="toc-empty">No headings found.</p>
            )}
          </div>
        </aside>

        {/* Main Content (Right Side) */}
        <article className="blog-post-main" ref={contentRef}>
          <header className="blog-post-header">
            <div className="blog-post-tags">
              {blog.tags.map(tag => (
                <span key={tag} className="post-tag-pill">{tag}</span>
              ))}
            </div>
            <h1 className="blog-post-title">{blog.title}</h1>
            <p className="blog-post-desc">{blog.description}</p>
            
            <div className="blog-post-stats">
              <span>{new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="meta-sep">·</span>
              <span>{minutes} min read</span>
            </div>
          </header>

          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h2: ({ children }) => <HeadingRenderer level={2}>{children}</HeadingRenderer>,
                h3: ({ children }) => <HeadingRenderer level={3}>{children}</HeadingRenderer>,
                img: ({ src, alt }) => <img src={resolveAssetSrc(src)} alt={alt || ''} />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
