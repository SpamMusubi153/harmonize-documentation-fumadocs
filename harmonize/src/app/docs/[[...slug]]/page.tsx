import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

import { MDXContent } from '@content-collections/mdx/react';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function Page( props: { params: Promise<{ slug?: string[] }>;} ) {
  
  const params = await props.params;

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const pageExtension = page?.data._meta.extension;
  
  console.log(`Under /docs. The current slug is: [${params.slug}]`);

  if (pageExtension == "mdx"){
    return (
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            code={page.data.body}
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    );
  }

  else if (pageExtension == "fjson"){
    return (
      <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* <DocsPage full={page.data.full}> */}
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>

          {/* <br></br> */}
          {/* <hr></hr> */}

          {/* <h3>At a Glance</h3> */}

          {/* Table of Contents */}
          {/* <div dangerouslySetInnerHTML={{__html: page.data.htmltoc}}></div> */}

          {/* <hr></hr> */}

          {/* <h2>The Details</h2> */}

          {/* Sphinx-Generated HTML */}
          <div dangerouslySetInnerHTML={{__html: page.data.body}}></div>

          {/* <MDXContent
            code={page.data.body}
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          /> */}
        </DocsBody>
      </DocsPage>
    );
  }  
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
