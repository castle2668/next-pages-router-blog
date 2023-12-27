import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import classes from './post-content.module.scss';
import PostHeader from './post-header';

const PostContent = (props) => {
  const { post } = props;

  const imagePath = `/images/blog-posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/blog-posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              fill
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
    code(props) {
      const { className, children } = props;
      // const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      const match = /language-(\w+)/.exec(className || '');

      // return (
      //   <SyntaxHighlighter style={atomDark} language={language}>
      //     {children}
      //   </SyntaxHighlighter>
      // );
      return match ? (
        <SyntaxHighlighter
          language={match[1]}
          style={atomDark}
          showLineNumbers
          data-language={match[1]}
        >
          {children}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
