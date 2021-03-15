import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import styles from "./Page.module.css";

/**
 * template page component
 */
export function Page(props) {
  return (
    <main className={styles.container}>
      <button className={styles.langButton} onClick={props.onLanguageClick}>
        {props.lang === "en" ? "Français" : "English"}
      </button>
      <Image
        className={styles.pageImage}
        src={props.image}
        alt={props.description}
        width={300}
        height={300}
        objectFit="cover"
      />
      <h1 className={styles.pageTitle}>{props.title}</h1>
      <nav className={styles.navPage}>
        {props.links.map((value) => (
          <Link href={value.link}>
            <a>{value.text}</a>
          </Link>
        ))}
      </nav>
      {props.description ? (
        <p className={styles.pageDescription}>{props.description}</p>
      ) : undefined}
      <div>{props.children}</div>
    </main>
  );
}

Page.propTypes = {
  /**
   * current language of the page
   */
  lang: PropTypes.string,
  /**
   * image for the page
   */
  image: PropTypes.string,

  /**
   * description of the page
   */
  description: PropTypes.string,

  /**
   * the title of the page
   */
  title: PropTypes.string,

  /**
   * language handler
   */
  onLanguageClick: PropTypes.func,

  /**
   * links for the page
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};
