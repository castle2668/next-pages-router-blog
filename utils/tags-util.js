import { getAllPosts } from './posts-util';

export const slugify = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase(); // e.g. 'Hello World' -> 'hello-world'
};

export const getAllTags = (posts) => {
  const tags = [];

  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        const existingTag = tags.find((t) => t.name === tag);

        if (existingTag) {
          existingTag.count += 1;
        } else {
          tags.push({
            count: 1,
            name: tag,
            slug: slugify(tag),
          });
        }
      });
    }
  });

  tags.sort((a, b) => (a.name > b.name ? 1 : -1));

  return tags;
};

export const getTagData = (tagIdentifier) => {
  const allPosts = getAllPosts();
  const tagData = allPosts.filter((post) =>
    post.tags.map((tag) => slugify(tag)).includes(tagIdentifier),
  );

  // 取得 slug 的 tag name
  const tag = getAllTags(allPosts).find((tag) => tag.slug === tagIdentifier);

  return {
    tag,
    posts: tagData,
  };
};
