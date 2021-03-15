import React, { useState } from "react";
import { Page } from "../components/Page";
import { fetchPagesMemo, generateNav } from "../lib/fetchPages";
import { fetchPostsMemo } from "../lib/fetchPosts";
import { fetchTagsMemo } from "../lib/fetchTags";
import { TagGrid } from "../components/TagGrid";
import { CardGrid } from "../components/CardGrid";
import { useRouter } from "next/router";

export async function getStaticProps() {
  const posts = await fetchPostsMemo();
  const pages = await fetchPagesMemo();
  const tags = await fetchTagsMemo();
  return {
    props: {
      pages: pages[2],
      tags: tags[2].map((tag) => {
        return { ...tag, image: tag.previewImage };
      }),
      posts: posts[2],
    },
  };
}

export default function Home({ pages, tags, posts }) {
  const [language, setLanguage] = useState("en");
  const router = useRouter();
  const links = generateNav(pages, language);
  return (
    <Page
      lang={language}
      image="/vercel.svg"
      title={language === "en" ? "Home" : "Accueil"}
      links={links}
      onLanguageClick={() => {
        setLanguage(language === "en" ? "fr" : "en");
      }}
    >
      <div className="homeContainer">
        <h2>Tags</h2>
        <TagGrid
          classNames="tagCenter"
          tags={tags.filter((tag) => tag.lang === language)}
          onClick={(id) => {
            router.push(`/tags/${id}`);
          }}
          size="large"
        />

        <h2>Posts</h2>
        <CardGrid
          cards={posts.filter((post) => post.lang === language)}
          onClickCard={(id) => {
            router.push(`/posts/${id}`);
          }}
          onClickTag={(id) => {
            router.push(`/tags/${id}`);
          }}
        />
      </div>
    </Page>
  );
}
