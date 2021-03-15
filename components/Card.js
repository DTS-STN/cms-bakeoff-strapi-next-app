import React from "react";
import styles from "./Card.module.css";
import PropTypes from "prop-types";
import Image from "next/image";
import { TagGrid } from "./TagGrid";

/**
 * card components for posts
 */
export function Card(props) {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardImage} onClick={() => props.onClick(props.id)}>
        <Image
          src={props.previewImage}
          alt={props.previewText}
          layout="fill"
          objectFit="cover"
        />
      </div>
      {props.tags ? (
        <TagGrid
          classNames={styles.cardTags}
          size="small"
          tags={props.tags}
          onClick={props.onClickTag}
        />
      ) : undefined}
      <p className={styles.cardTitle} onClick={() => props.onClick(props.id)}>
        {props.title}
      </p>
      <p className={styles.cardText} onClick={() => props.onClick(props.id)}>
        {props.previewText}
      </p>
    </article>
  );
}

Card.propTypes = {
  /**
   * the id for the card
   */
  id: PropTypes.string.isRequired,

  /**
   * image for the card
   */
  previewImage: PropTypes.string,

  /**
   * title for the card
   */
  title: PropTypes.string,

  /**
   * description for the card
   */
  previewText: PropTypes.string,

  /**
   * tags data
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
   * click handler for tag
   */
  onClickTag: PropTypes.func,

  /**
   * click handler for card
   */
  onClick: PropTypes.func,
};
