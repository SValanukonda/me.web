// Auto-discover all .md files in src/content/
const markdownFiles = import.meta.glob('../content/*.md', { query: '?raw', import: 'default', eager: true });

// Simple frontmatter parser (no extra dependency needed)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2].trim();
  const meta = {};

  for (const line of frontmatter.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Parse array values like [Tag1, Tag2]
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s => s.trim());
    }

    meta[key] = value;
  }

  return { meta, content };
}

// Build blogs array automatically from all .md files
function loadBlogs() {
  const blogs = [];

  for (const [path, raw] of Object.entries(markdownFiles)) {
    const { meta, content } = parseFrontmatter(raw);
    
    // Derive ID from filename: "../content/my-post.md" → "my-post"
    const filename = path.split('/').pop().replace('.md', '');

    blogs.push({
      id: filename,
      title: meta.title || filename,
      date: meta.date || '2000-01-01',
      featured: meta.featured === 'true',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      description: meta.description || '',
      content,
    });
  }

  // Keep featured posts on top, then sort the rest by newest first.
  blogs.sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }
    return new Date(b.date) - new Date(a.date);
  });
  return blogs;
}

export const blogs = loadBlogs();

// Helper to get unique tags with counts
export const getAllTags = () => {
  const counts = {};
  blogs.forEach(blog => {
    blog.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
};
