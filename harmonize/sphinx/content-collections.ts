import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const linkTitleSchema = z.object({
  "link": z.string(),
  "title": z.string(),
});

// Custom-Implemented for Handling Sphinx Documentation
const apiDocsSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    // content: z.string(),
    toc: z.string().optional(),
    htmltoc: z.string().optional(),
    // structuredData: 
    
    body: z.string(),

    // meta: z.string(),
    // Icon? _openapi?
    // full: z.ZodOptional<z.ZodBoolean>;
    // _openapi: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
})

// // Also "passthrough" any other unaddressed and remaining properties.
// }).passthrough();

async function processApiDocs(document: { toc: any; body: any; title: any; _meta: any; }, {cache}: any ){

  // current_page_name: z.string(),

  // console.log(document)

  const toc = await cache(
    document.toc,
    async (toc: string) => {
      // Remove the repeated header title.
      // - The "s" flag after the closing backward slash allows the dot (.) wildcard to match all characters
      // - (including newlines).
      toc = toc.replace(/^<ul>.*module<\/a>/s, "");
      toc = toc.replace(/<\/ul>.*$/s, "")

      return toc
    }
  );

  const body = await cache(
    document.body,
    async (body: string) => {
      return body.replace(/<h1>.*<\/h1>/, "");
    }
  );

  const newObject = {
    title: document.title,
    // description: ,
    // toc: ,
    htmltoc: toc,
    body: body,

    _meta: document._meta,

    // ...document,
    // body,
    // toc
  };

  // console.log("!!", newObject._meta)

  return newObject;
}

const apiDocs = defineCollection({
  name: 'apiDocs',
  directory: 'content/docs',
  include: '**/*.fjson',
  parser: 'json',
  schema: apiDocsSchema,
  onSuccess: (docs: string | any[]) => {
    console.log(`Generated a collection of API documents containing ${docs.length} item${(docs.length == 1) ? "" : "s"}!`);
    // console.log(docs[0]);
  },
  transform: processApiDocs,
})

export { apiDocs }