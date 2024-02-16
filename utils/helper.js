export const slugify = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase(); // e.g. 'Hello World' -> 'hello-world'
};
