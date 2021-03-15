import "cross-fetch/polyfill";
import "node-fetch";
import { processContent } from "./processContent";

function fetchPages() {
  let results = [];
  return async () => {
    if (results.length > 1) {
      return results;
    }
    let pagesDataMap = {};
    let pagesDataArray = [];
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + "/pages");
    if (res.ok) {
      const data = await res.json();
      let pages = [];
      for (const dataObj of data) {
        let result = await processContent(dataObj, "pages");
        pages = pages.concat(
          result.map((data) => {
            pagesDataArray.push({ ...data });
            pagesDataMap[data.id] = { ...data };
            return {
              params: {
                id: data["id"],
              },
            };
          })
        );
      }
      results = [pages, pagesDataMap, pagesDataArray];
      return results;
    } else {
      throw new Error(
        `strapi pages endpoint returned non okay status code: ${
          res.status
        }: ${await res.text()}`
      );
    }
  };
}

export function generateNav(pages, lang) {
  let navigation = [];
  if (lang === "en") {
    navigation.push({
      link: "/",
      text: "Home",
    });
  } else {
    navigation.push({
      link: "/",
      text: "Accueil",
    });
  }
  for (const page of pages) {
    if (page.lang === lang) {
      navigation.push({
        link: `/pages/${page["id"]}`,
        text: page["title"],
      });
    }
  }
  return navigation;
}

export const fetchPagesMemo = fetchPages();
