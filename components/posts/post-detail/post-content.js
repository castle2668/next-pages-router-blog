import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import remarkGfm from 'remark-gfm';

import { replaceLast } from '@/utils/helper';

import classes from './post-content.module.scss';
import PostHeader from './post-header';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

const customRenderers = {
  p(paragraph) {
    const { node } = paragraph;

    if (node.children[0].tagName === 'img') {
      const image = node.children[0];
      const src = image.properties.src.includes('https')
        ? image.properties.src
        : `/images/blog-posts/${slug}/${image.properties.src}`;

      return (
        <div className={classes.image}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={image.properties.alt} />
        </div>
      );
    }

    return <p>{paragraph.children}</p>;
  },
  code(props) {
    const { className, children } = props;

    const codeContent = replaceLast(children, '\n', '');

    const match = /language-(\w+)/.exec(className || '');

    return match ? (
      <SyntaxHighlighter
        language={match[1]}
        style={atomDark}
        showLineNumbers
        data-language={match[1]}
      >
        {codeContent}
      </SyntaxHighlighter>
    ) : (
      <code className={className}>{codeContent}</code>
    );
  },
  table(table) {
    return (
      <div style={{ overflowX: 'auto' }}>
        <table>{table.children}</table>
      </div>
    );
  },
};

const PostContent = ({ post }) => {
  const { title, image, date, slug, content } = post;

  const imagePath = `/images/blog-posts/${slug}/${image}`;
  const formattedDate = new Date(date).toLocaleDateString('zh-TW', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={image && imagePath} />
      <p className={classes.date}>
        <time>📆 {formattedDate}</time>
      </p>
      <ReactMarkdown components={customRenderers} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};

PostContent.propTypes = {
  post: PropTypes.object,
};
PostContent.defaultProps = {
  post: {},
};

export default PostContent;
