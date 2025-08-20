import { defineCollection, defineConfig } from '@content-collections/core';
import {
  createMetaSchema,
  createDocSchema,
  createAPIDocsSchema,
  transformMDX,
} from '@fumadocs/content-collections/configuration';
import { z } from "zod";

const docs = defineCollection({
  name: 'docs',
  directory: 'content/docs',
  include: '**/*.mdx',
  schema: createDocSchema,
  transform: transformMDX,
});

const metas = defineCollection({
  name: 'meta',
  directory: 'content/docs',
  include: '**/meta.json',
  parser: 'json',
  schema: createMetaSchema,
});

const apiDocs = defineCollection({
  name: 'apiDocs',
  directory: 'content/apiDocs',
  include: '**/*.fjson',
  parser: 'json',
  schema: createAPIDocsSchema,
});

export default defineConfig({
  collections: [docs, metas],
});
