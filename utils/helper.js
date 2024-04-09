export const slugify = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase(); // e.g. 'Hello World' -> 'hello-world'
};

// 移除字串中最後一個指定的字元 e.g. replaceLast("這是一個範例。\n", '\n', '') -> "這是一個範例。"
export const replaceLast = (str, target, replacement) => {
  const lastIndex = str.lastIndexOf(target);
  if (lastIndex === -1) {
    return str;
  }
  return (
    str.substring(0, lastIndex) +
    replacement +
    str.substring(lastIndex + target.length)
  );
};
