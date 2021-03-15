import "cross-fetch/polyfill";
import "node-fetch";
import { processContent } from "./processContent";

function fetchPosts() {
  let results = [];
  return async () => {
    if (results.length > 1) {
      return results;
    }
    let postsDataMap = {};
    let postsDataArray = [];
    const res = await fetch(process.env.NEXT_PUBLIC_STRAPI_API_URL + "/posts");
    if (res.ok) {
      const data = await res.json();
      let posts = [];
      for (const dataObj of data) {
        let result = await processContent(dataObj, "posts");
        result[0]["tags"] = dataObj["tags"].map((value) => {
          return {
            id: value["TagID_EN"],
            title: value["Tag_EN"],
            description: value["TagDescription_EN"],
            image:
              process.env.NEXT_PUBLIC_STRAPI_API_URL +
              (value["TagPreviewImage_EN"]
                ? value["TagPreviewImage_EN"]["url"]
                : undefined),
          };
        });
        postsDataArray.push({ ...result[0] });
        postsDataMap[result[0]["id"]] = { ...result[0] };

        result[1]["tags"] = dataObj["tags"].map((value) => {
          return {
            id: value["TagID_FR"],
            title: value["Tag_FR"],
            description: value["TagDescription_FR"],
            image:
              process.env.NEXT_PUBLIC_STRAPI_API_URL +
              (value["TagPreviewImage_FR"]
                ? value["TagPreviewImage_FR"]["url"]
                : undefined),
          };
        });
        postsDataArray.push({ ...result[1] });
        postsDataMap[result[1]["id"]] = { ...result[1] };

        posts = posts.concat(
          result.map((data) => {
            return {
              params: {
                id: data["id"],
              },
            };
          })
        );
      }
      results = [posts, postsDataMap, postsDataArray];
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

export const fetchPostsMemo = fetchPosts();
