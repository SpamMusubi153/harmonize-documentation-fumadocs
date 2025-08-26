import { allDocs, allMetas } from 'content-collections';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from '@fumadocs/content-collections';

import { allApiDocs } from 'content-collections';
import { createJSONSource } from '../../sphinx/source';

// console.log(allMetas)

let mdxSource = createMDXSource(allDocs, allMetas);
let jsonSource = createJSONSource(allApiDocs, allMetas);

let unifiedSource = {
  files: [
    ...mdxSource.files,
    ...jsonSource,
  ]
}

// console.log(mdxSource);
// console.log(jsonSource);
// console.log(unifiedSource);

export const source = loader({
  baseUrl: '/docs',
  source: unifiedSource,
});

// import { createJSONSource } from '../../sphinx/helper';
// import { allApiDocs } from 'content-collections';
// export const source2 = loader({
//   baseUrl: '/apiDocs',
//   source: createMDXSource(allApiDocs, allMetas),
// });
