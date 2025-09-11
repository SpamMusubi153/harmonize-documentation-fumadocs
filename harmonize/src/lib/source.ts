import { allDocs, allMetas } from 'content-collections';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from '@fumadocs/content-collections';

import { allApiDocs } from 'content-collections';
import { createJSONSource } from '../../sphinx/source';

const mdxSource = createMDXSource(allDocs, allMetas);
const jsonSource = createJSONSource(allApiDocs, allMetas);

const unifiedSource = {
  files: [
    // For some reason, the mdxsource might return a function containing files.
    // TODO: Determine the underlying reason.
    ...(typeof mdxSource.files === "function"? mdxSource.files() : mdxSource.files),
    ...jsonSource,
  ]
}

// Debugging Printouts
// console.log(mdxSource);
// console.log(jsonSource);
// console.log(unifiedSource);

export const source = loader({
  baseUrl: '/docs',
  source: unifiedSource,
});
