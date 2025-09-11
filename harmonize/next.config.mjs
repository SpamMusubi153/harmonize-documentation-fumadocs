import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const config = {

  // This option specifies the base path under which the documentation site functions.
  basePath: "/harmonize-documentation-fumadocs",

  reactStrictMode: true,
  output: 'export',
  // eslint: {
  //   ignoreDuringBuilds: true
  // }

  // This is not the safest option; a more experienced TypeScript developer would likely
  // be able to correct typing errors to enable a build without this option.
  typescript: {
    ignoreBuildErrors: true,
  }

};

export default withContentCollections(config);
