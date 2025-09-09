import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

// const linkTitleSchema = z.object({
//   "link": z.string(),
//   "title": z.string(),
// });

// Custom-Implemented for Handling Sphinx Documentation
const apiDocsSchema = z.object({

    title: z.string(),
    description: z.string().optional(),
    // content: z.string(),
    toc: z.string().optional(),
    htmltoc: z.string().optional(),
    structuredData: z.string().optional(),
    
    body: z.string(),

    // meta: z.string(),
    // Icon? _openapi?
    // full: z.ZodOptional<z.ZodBoolean>;
    // _openapi: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
})

// // Also "passthrough" any other unaddressed and remaining properties.
// }).passthrough();

// type meta = {
//   filePath: string,
//   fileName: string,
//   directory: string,
//   extension: string,
//   path: string,
// }

const apiDocs = defineCollection({
  name: 'apiDocs',
  directory: 'content/docs',
  include: '**/*.fjson',
  parser: 'json',
  schema: apiDocsSchema,
  onSuccess: (docs) => {
    console.log(`Generated a collection of API documents containing ${docs.length} item${(docs.length == 1) ? "" : "s"}!`);
    // console.log(docs[0]);
  },
  transform: async (doc, { cache }) => {

    const title = await cache(
        doc.title || "",
        async (title: string) => {
          // Remove title formatting.
          title = title.replace(/^<code.*"pre">/, "");
          title = title.replace("</span></code>", "")

          return title
        }
      );

    const toc = await cache(
      doc.toc || "",
      async (toc: string) => {
        
        // Pull out data and function names.
        let structuredTOC = [];

        let matchRE = /<li><a class="reference internal" href="(.*?)"><code class="docutils literal notranslate"><span class="pre">(.*?)<\/span><\/code><\/a><\/li>/g;

        let currentMatch = matchRE.exec(toc);
        while (currentMatch != undefined){
          const currentLink = currentMatch[1];
          const currentTitle = currentMatch[2];

          structuredTOC.push({
            "title": currentTitle,
            "url": currentLink,
            "depth": 3,
          });

          currentMatch = matchRE.exec(toc);
        }

        return structuredTOC
      }
    );

    // Remove the repeated header title.
    // - The "s" flag after the closing backward slash allows the dot (.) wildcard to match all characters
    // - (including newlines).
    const htmltoc = doc.toc?.replace(/^<ul>.*module<\/a>/s, "").replace(/<\/ul>.*$/s, "");

    const [body, structuredData] = await cache(
      doc.body,
      async (body: string) => {

        interface content {
          heading: string,
          content: string,
        };

        interface heading {
          id: string,
          content: string,
        };

        let structuredData : {contents: content[], headings:heading[]} = {
          contents: [],
          headings: [],
        };

        // Remove the leading body contents before the API Section.
        // Also remove the duplicate header provided by Fumadocs.
        body = body.replace(/^.*?API.*?h3>\n/s, "").replace(/<h1>.*?<\/h1>/, "");

        const sectionParseRE = /<dl.*?id="(.*?)".*?<dd>(.*?)<\/dd>/sg;

        let currentMatch = sectionParseRE.exec(body);
        while (currentMatch != undefined){

          const currentHeading = currentMatch[1];
          const currentContent = currentMatch[2].replace(/<.*?>/g, "").replace("\n", " ");

          structuredData.contents.push({
            "heading": currentHeading,
            "content": currentContent,
          });

          structuredData.headings.push({
            "id": currentHeading,
            "content": currentHeading
          });

          currentMatch = sectionParseRE.exec(body);
        }

        return [body, structuredData];
      }
    );

    const newObject = {
      ...doc,
      title,
      toc,
      body,
      
      // title: document.title,
      // // description: ,
      htmltoc,
      // body: body,
      _meta: doc._meta,
      structuredData,

      // _meta: document._meta,

      // ...document,
      // title: document.title,
      // // description: ,
      // // toc: ,
      // htmltoc: toc,
      // body: body,

      // _meta: document._meta,

      // // ...document,
      // // body,
      // // toc
    };

    return newObject;

  },
})

export { apiDocs }