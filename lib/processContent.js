import remark from "remark";
import html from "remark-html";

export async function processContent(dataObj, contentType = "pages") {
  const processedContentEN = await remark()
    .use(html)
    .process(dataObj["Content_EN"]);

  const processedContentFR = await remark()
    .use(html)
    .process(dataObj["Content_FR"]);

  return [
    {
      id: contentType === "pages" ? dataObj["PageID_EN"] : dataObj["PostID_EN"],
      dbId: dataObj["id"],
      lang: "en",
      title: dataObj["Title_EN"],
      linkedPage:
        contentType === "pages" ? dataObj["PageID_FR"] : dataObj["PostID_FR"],
      content: processedContentEN.toString(),
      previewImage:
        process.env.NEXT_PUBLIC_STRAPI_API_URL +
        (dataObj["PreviewImage_EN"]
          ? dataObj["PreviewImage_EN"]["url"]
          : undefined),
      previewText: dataObj["PreviewText_EN"],
      createdAt: dataObj["created_at"],
      updatedAt: dataObj["updated_at"],
    },
    {
      id: contentType === "pages" ? dataObj["PageID_FR"] : dataObj["PostID_FR"],
      dbId: dataObj["id"],
      lang: "fr",
      title: dataObj["Title_FR"],
      linkedPage:
        contentType === "pages" ? dataObj["PageID_EN"] : dataObj["PostID_EN"],
      content: processedContentFR.toString(),
      previewImage:
        process.env.NEXT_PUBLIC_STRAPI_API_URL +
        (dataObj["PreviewImage_FR"]
          ? dataObj["PreviewImage_FR"]["url"]
          : undefined),
      previewText: dataObj["PreviewText_FR"],
      createdAt: dataObj["created_at"],
      updatedAt: dataObj["updated_at"],
    },
  ];
}
