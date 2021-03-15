import React from "react";
import { Page } from "../../components/Page";
import { CardGrid } from "../../components/CardGrid";
import { fetchPagesMemo, generateNav } from "../../lib/fetchPages";
import { fetchTagsMemo } from "../../lib/fetchTags";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const tagsData = await fetchTagsMemo();
  return {
    paths: tagsData[0],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pagesData = await fetchPagesMemo();
  const tagsData = await fetchTagsMemo();
  return {
    props: {
      ...tagsData[1][params.id],
      links: generateNav(pagesData[2], tagsData[1][params.id].lang),
    },
  };
}

export default function Tags(props) {
  const router = useRouter();
  return (
    <Page
      title={props.title}
      description={props.description}
      lang={props.lang}
      image={props.previewImage}
      links={props.links}
      onLanguageClick={() => {
        router.push(`/tags/${props.linkedPage}`);
      }}
    >
      <CardGrid
        cards={props.posts}
        onClickCard={(id) => {
          router.push(`/posts/${id}`);
        }}
      />
    </Page>
  );
}
