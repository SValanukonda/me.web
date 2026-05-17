import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogs, getAllTags } from '../data/blogsData';
import './Blogs.css';

function Blogs() {
  const [selectedTag, setSelectedTag] = useState(null);

  const tagCounts = getAllTags();
  const allTags = Object.keys(tagCounts).sort();

  // Sort by date (newest first), filter by selected tag
  const filteredBlogs = useMemo(() => {
    let result = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (selectedTag) {
      result = result.filter(blog => blog.tags.includes(selectedTag));
    }
    return result;
  }, [selectedTag]);

  return (
    <div className="blogs-page">
      <header className="blogs-header">
        <h1>Writings</h1>
        <p className="page-subtitle">Thoughts on software engineering, distributed systems, and security.</p>
      </header>

      {/* Tags Filter */}
      <section className="tags-section">
        <div className="tags-cloud">
          <button 
            className={`tag-chip ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-chip ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag} <span className="tag-count">{tagCounts[tag]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="recent-blogs-section">
        {filteredBlogs.length === 0 ? (
          <p className="no-posts">No posts found.</p>
        ) : (
          <div className="blog-grid">
            {filteredBlogs.map((blog, index) => {
              const isFeatured = index === 0 && !selectedTag;
              return (
                <Link to={`/blog/${blog.id}`} key={blog.id} className={`blog-card ${isFeatured ? 'featured-card' : ''}`}>
                  <div className="blog-card-content">
                    <div className="blog-meta">
                      <span className="meta-item"><Calendar size={14} /> {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      <span className="meta-item"><Clock size={14} /> 5 min read</span>
                    </div>
                    
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-desc">{blog.description}</p>
                    
                    <div className="blog-bottom">
                      <div className="blog-tags">
                        {blog.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="blog-tag-pill">{tag}</span>
                        ))}
                      </div>
                      <span className="read-more">Read More <ArrowRight size={16} /></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Blogs;
