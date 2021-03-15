import React from "react";
import { Page } from "../../components/Page";
import { fetchPagesMemo, generateNav } from "../../lib/fetchPages";
import { fetchPostsMemo } from "../../lib/fetchPosts";
import { TagGrid } from "../../components/TagGrid";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const postsData = await fetchPostsMemo();
  return {
    paths: postsData[0],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postsData = await fetchPostsMemo();
  const pagesData = await fetchPagesMemo();
  return {
    props: {
      ...postsData[1][params.id],
      links: generateNav(pagesData[2], postsData[1][params.id].lang),
    },
  };
}

export default function Posts(props) {
  const router = useRouter();
  return (
    <Page
      lang={props.lang}
      image={props.previewImage}
      title={props.title}
      links={props.links}
      onLanguageClick={() => {
        router.push(`/posts/${props.linkedPage}`);
      }}
    >
      {props.tags && props.tags.length > 0 ? (
        <TagGrid
          classNames="tagCenter"
          tags={props.tags}
          size="large"
          onClick={(id) => {
            router.push(`/tags/${id}`);
          }}
        />
      ) : undefined}
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </Page>
  );
}
