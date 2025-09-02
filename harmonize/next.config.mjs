import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const config = {
  basePath: "/harmonize-documentation-fumadocs",
  reactStrictMode: true,
  output: 'export',
  // eslint: {
  //   ignoreDuringBuilds: true
  // }
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default withContentCollections(config);
