import { allDocs, allMetas } from 'content-collections';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from '@fumadocs/content-collections';

import { allApiDocs } from 'content-collections';
import { createJSONSource } from '../../sphinx/source';

import { icons } from 'lucide-react'
import { createElement } from 'react';

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

  // Support Loading Lucide Icons
  icon: (icon) => {
    if (!icon) {
      return;
    }

    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  }
});
