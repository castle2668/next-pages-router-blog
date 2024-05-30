import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'blog-posts');

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data, // metadata
    content, // markdown text content
  };

  return postData;
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1,
  );

  return sortedPosts;
};

// 生成每頁的文章陣列
export const getPaginatedPosts = (page = 1, postsPerPage = 10) => {
  const currentPage = parseInt(page);
  const sortedPosts = getAllPosts();

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    currentPage: currentPage, // 當前頁數
    numPages: Math.ceil(sortedPosts.length / postsPerPage), // 總頁數
  };
};

// 生成文章的分頁陣列
export const getPostPaths = (postsPerPage = 10) => {
  const sortedPosts = getAllPosts();
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // 創建 paths 陣列
  const paths = [];
  for (let page = 1; page <= totalPages; page += 1) {
    paths.push({ params: { slug: page.toString() } });
  }

  return paths;
};
