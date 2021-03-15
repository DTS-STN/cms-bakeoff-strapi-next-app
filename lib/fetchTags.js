import "cross-fetch/polyfill";
import "node-fetch";
import { processContent } from "./processContent";

function fetchTags() {
  let results = [];
  return async () => {
    if (results.length > 1) {
      return results;
    }
    let tagsDataMap = {};
    let tagsDataArray = [];
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + "/tags");
    if (res.ok) {
      const data = await res.json();
      let tags = [];
      for (const dataObj of data) {
        let posts = [];
        for (let postObj of dataObj["posts"]) {
          posts = posts.concat(await processContent(postObj, "posts"));
        }
        tagsDataMap[dataObj["TagID_EN"]] = {
          id: dataObj["TagID_EN"],
          lang: "en",
          title: dataObj["Tag_EN"],
          description: dataObj["TagDescription_EN"],
          previewImage:
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
            dataObj["TagPreviewImage_EN"]["url"],
          linkedPage: dataObj["TagID_FR"],
          posts: posts.filter((obj) => obj.lang === "en"),
        };
        tagsDataArray.push({ ...tagsDataMap[dataObj["TagID_EN"]] });
        tags.push({
          params: {
            id: dataObj["TagID_EN"],
          },
        });

        tagsDataMap[dataObj["TagID_FR"]] = {
          id: dataObj["TagID_FR"],
          lang: "fr",
          title: dataObj["Tag_FR"],
          description: dataObj["TagDescription_FR"],
          previewImage:
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
            dataObj["TagPreviewImage_FR"]["url"],
          linkedPage: dataObj["TagID_EN"],
          posts: posts.filter((obj) => obj.lang === "fr"),
        };
        tagsDataArray.push({ ...tagsDataMap[dataObj["TagID_FR"]] });
        tags.push({
          params: {
            id: dataObj["TagID_FR"],
          },
        });
      }
      return [tags, tagsDataMap, tagsDataArray];
    } else {
      throw new Error(
        `strapi pages endpoint returned non okay status code: ${
          res.status
        }: ${await res.text()}`
      );
    }
  };
}

export const fetchTagsMemo = fetchTags();
