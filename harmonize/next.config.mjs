import { withContentCollections } from '@content-collections/next';

/** @type {import('next').NextConfig} */
const config = {
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
