//import remarkGfm from 'remark-gfm'
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  output: "export",
  env: {
    SITE_URL: process.env.SITE_URL,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // remarkPlugins: [remarkGfm],
    // rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
