import { defineCollection, defineConfig } from '@content-collections/core';
import { z } from 'zod';

const linkTitleSchema = z.object({
  "link": z.string(),
  "title": z.string(),
});

// Custom-Implemented for Handling Sphinx Documentation
const apiDocsSchema = z.object({
    title: z.string(),
    // meta: z.string(),
    // description: z.string(),
    current_page_name: z.string(),

    body: z.string(),

    prev: linkTitleSchema.optional(),
    next: linkTitleSchema.optional(),
    // Icon? _openapi?
    // full: z.ZodOptional<z.ZodBoolean>;
    // _openapi: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;

// Also "passthrough" any other unaddressed and remaining properties.
}).passthrough();

async function processApiDocs(document, {cache} ){

  // console.log(document)
  const body = await cache(
    document.body,
    async (body) => {
      return body.replace(/<h1>.*<\/h1>/, "");
    }
  );

  const toc = await cache(
    document.toc,
    async (toc) => {
      // Remove the repeated header title.
      // - The "s" flag after the closing backward slash allows the dot (.) wildcard to match all characters
      // - (including newlines).
      toc = toc.replace(/^<ul>.*module<\/a>/s, "");
      toc = toc.replace(/<\/ul>.*$/s, "")

      return toc
    }
  );

  const newObject = {
    ...document,
    body,
    toc
  };

  return newObject;
}

// const apiDocs = defineCollection({
//   name: 'apiDocs',
//   directory: 'content/docs/pythonAPI',
//   include: '**/*.fjson',
//   parser: 'json',
//   schema: apiDocsSchema,
//   onSuccess: (docs) => {
//     console.log(`Generated a collection with ${docs.length} items!`);
//     // console.log(docs[0]);
//   },
//   transform: processApiDocs,
// });

const apiDocsProperties = {
  name: 'apiDocs',
  directory: 'content/docs/pythonAPI',
  include: '**/*.fjson',
  parser: 'json',
  schema: apiDocsSchema,
  onSuccess: (docs) => {
    console.log(`Generated a collection with ${docs.length} items!`);
    // console.log(docs[0]);
  },
  transform: processApiDocs,
};

export { apiDocsProperties }