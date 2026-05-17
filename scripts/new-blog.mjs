import { writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, 'src', 'content');

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

async function main() {
  console.log('\n📝  New Blog Post\n');

  const title = await ask('Title: ');
  const tags = await ask('Tags (comma-separated, e.g. Performance, Java): ');
  const description = await ask('Short description: ');

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const date = new Date().toISOString().split('T')[0];
  const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);

  const frontmatter = `---
title: ${title}
date: ${date}
tags: [${tagList.join(', ')}]
description: ${description}
---

## Introduction

Start writing here...
`;

  const filepath = join(contentDir, `${slug}.md`);

  if (existsSync(filepath)) {
    console.log(`\n❌ File already exists: ${filepath}`);
    rl.close();
    process.exit(1);
  }

  writeFileSync(filepath, frontmatter, 'utf-8');
  console.log(`\n✅ Created: src/content/${slug}.md`);
  console.log(`   Open it and start writing!\n`);

  rl.close();
}

main();
