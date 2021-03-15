import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "./Tag.module.css";

/**
 * tag component for displaying content tags
 */
export function Tag(props) {
  return (
    <article
      className={
        props.size === "large"
          ? `${styles.tagContainer} ${styles.lg}`
          : styles.tagContainer
      }
      onClick={() => props.onClick(props.id)}
    >
      {props.image ? (
        <div className={styles.tagImage}>
          <Image
            src={props.image}
            alt={props.description}
            objectFit="cover"
            layout="fill"
          />
        </div>
      ) : undefined}
      <p className={styles.tagText}>{props.title}</p>
    </article>
  );
}

Tag.propTypes = {
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

  /**
   * size of the tag
   */
  size: PropTypes.oneOf(["small", "large"]),

  /**
   * event handler for when tag is clicked
   */
  onClick: PropTypes.func,
};
