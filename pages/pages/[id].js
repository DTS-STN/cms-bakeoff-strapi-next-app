import React from "react";
import { Page } from "../../components/Page";
import { fetchPagesMemo, generateNav } from "../../lib/fetchPages";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  const pagesData = await fetchPagesMemo();
  return {
    paths: pagesData[0],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pagesData = await fetchPagesMemo();
  return {
    props: {
      ...pagesData[1][params.id],
      links: generateNav(pagesData[2], pagesData[1][params.id].lang),
    },
  };
}

export default function Pages(props) {
  const router = useRouter();
  return (
    <Page
      lang={props.lang}
      image={props.previewImage}
      title={props.title}
      links={props.links}
      onLanguageClick={() => {
        router.push(`/pages/${props.linkedPage}`);
      }}
    >
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </Page>
  );
}
