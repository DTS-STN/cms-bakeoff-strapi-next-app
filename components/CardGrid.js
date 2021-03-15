import React from "react";
import PropTypes from "prop-types";
import { Card } from "./Card";
import styles from "./CardGrid.module.css";

/**
 * grid component for cards
 */
export function CardGrid(props) {
  return (
    <div className={styles.cardGridContainer}>
      {props.cards.map((value) => (
        <Card
          key={value.id}
          {...value}
          onClick={props.onClickCard}
          onClickTag={props.onClickTag}
        />
      ))}
    </div>
  );
}

CardGrid.propTypes = {
  /**
   * cards data
   */
  cards: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),

  /**
   * click handler for when a card is clicked
   */
  onClickCard: PropTypes.func,

  /**
   * click handler for when a tag is clicked
   */
  onClickTag: PropTypes.func,
};
