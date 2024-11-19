import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

const defaultDocument: Document = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'No content available.',
          marks: [],
          data: {}
        }
      ]
    }
  ]
};

export const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  environment: 'master'
});

export async function getContentTypes() {
  try {
    const response = await contentfulClient.getContentTypes();
    console.log('Available content types:', response.items.map(type => ({
      id: type.sys.id,
      name: type.name,
      fields: type.fields.map(field => ({
        id: field.id,
        type: field.type,
        required: field.required
      }))
    })));
    return response.items;
  } catch (error) {
    console.error('Error fetching content types:', error);
    throw error;
  }
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt?: string;
  shortDescription?: string;
  content: Document;
  featuredImage: {
    url: string;
    title: string;
  };
  author?: {
    name: string;
    avatar?: {
      url: string;
    };
  };
  publishedDate: string;
  tags?: string[];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pageBlogPost',
      order: '-fields.publishedDate',
      include: 2
    });

    return response.items.map((item: any) => {
      // Log the content structure for debugging
      console.log('Raw content:', JSON.stringify(item.fields.content, null, 2));

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt || item.fields.shortDescription,
        content: item.fields.content || defaultDocument,
        featuredImage: item.fields.featuredImage?.fields?.file
          ? {
              url: `https:${item.fields.featuredImage.fields.file.url}`,
              title: item.fields.featuredImage.fields.title || item.fields.title,
            }
          : {
              url: '',
              title: item.fields.title,
            },
        author: item.fields.author?.fields
          ? {
              name: item.fields.author.fields.name,
              avatar: item.fields.author.fields.avatar?.fields?.file
                ? {
                    url: `https:${item.fields.author.fields.avatar.fields.file.url}`,
                  }
                : undefined,
            }
          : undefined,
        publishedDate: item.fields.publishedDate,
        tags: item.fields.tags || [],
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pageBlogPost',
      'fields.slug': slug,
      limit: 1,
    });

    if (!response.items.length) {
      return null;
    }

    const item = response.items[0];
    return {
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt || item.fields.shortDescription,
      content: item.fields.content || defaultDocument,
      featuredImage: {
        url: `https:${item.fields.featuredImage?.fields?.file?.url}` || '',
        title: item.fields.featuredImage?.fields?.title || item.fields.title,
      },
      author: item.fields.author?.fields
        ? {
            name: item.fields.author.fields.name,
            avatar: item.fields.author.fields.avatar?.fields?.file
              ? {
                  url: `https:${item.fields.author.fields.avatar.fields.file.url}`,
                }
              : undefined,
          }
        : undefined,
      publishedDate: item.fields.publishedDate,
      tags: item.fields.tags || [],
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}
