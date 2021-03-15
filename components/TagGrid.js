import React from "react";
import PropTypes from "prop-types";
import { Tag } from "./Tag";
import styles from "./TagGrid.module.css";

/**
 * Grid component for tags
 */
export function TagGrid(props) {
  return (
    <div
      className={
        props.classNames
          ? `${styles.tagGridContainer} ${props.classNames}`
          : styles.tagGridContainer
      }
    >
      {props.tags.map((value) => (
        <Tag
          key={value.id}
          {...value}
          size={props.size}
          onClick={props.onClick}
        />
      ))}
    </div>
  );
}

TagGrid.propTypes = {
  /**
   * the tags to display
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * the id of the tag
       */
      id: PropTypes.string.isRequired,

      /**
       * the image for the tag
       */
      image: PropTypes.string,

      /**
       * description
       */
      description: PropTypes.string,

      /**
       * tag title
       */
      title: PropTypes.string,
    })
  ),
  /**
   * size of the tag
   */
  size: PropTypes.oneOf(["small", "large"]),

  /**
   * handler for when a tag is clicked
   */
  onClick: PropTypes.func,

  /**
   * extra classNames
   */
  classNames: PropTypes.string,
};
