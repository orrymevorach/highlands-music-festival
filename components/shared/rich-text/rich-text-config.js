import styles from './rich-text.module.scss';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

export const sharedRichTextConfig = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className={styles.richText}>{children}</p>;
    },
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} className={styles.link}>
        {children}
      </a>
    ),
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className={styles.unorderedList}>{children}</ul>
    ),
    // [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,

    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className={styles.orderedList}>{children}</ol>
    ),
  },
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};
