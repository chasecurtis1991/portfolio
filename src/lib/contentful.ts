import { createClient } from "contentful";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import type {
  Asset,
  ContentTypeCollection,
  Entry,
  EntryCollection,
} from "contentful";

// Validate environment variables
function validateEnvVariables() {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId) {
    throw new ContentfulError(
      "Missing NEXT_PUBLIC_CONTENTFUL_SPACE_ID environment variable"
    );
  }
  if (!accessToken) {
    throw new ContentfulError(
      "Missing NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN environment variable"
    );
  }

  return { spaceId, accessToken };
}

const defaultDocument: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "No content available.",
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

interface AssetFields {
  title: string;
  file: {
    url: string;
  };
}

type EntrySkeletonType = {
  contentTypeId: string;
  fields: Record<string, any>;
};

interface AuthorSkeleton extends EntrySkeletonType {
  contentTypeId: "author";
  fields: {
    name: string;
    avatar?: {
      fields: AssetFields;
      sys: { type: "Asset"; id: string };
    };
  }
}

interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "blogPost";
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: Document;
    featuredImage?: {
      fields: AssetFields;
      sys: { type: "Asset"; id: string };
    };
    publishedDate?: string;
    tags?: string[];
    author?: {
      fields: AuthorSkeleton['fields'];
      sys: { type: "Entry"; id: string };
    };
  };
}

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  publishedDate: string;
  tags: string[];
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
}

class ContentfulError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = "ContentfulError";
  }
}

// Initialize Contentful client with validated environment variables
const { spaceId, accessToken } = validateEnvVariables();

// Log environment variables for debugging (values will be undefined if not properly set)
console.log('Contentful Config:', {
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  hasAccessToken: !!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
});

export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: "master",
});

// Immediately log available content types on module load
(async () => {
  try {
    console.log('Fetching content types...');
    const types = await contentfulClient.getContentTypes();
    console.log('Available content types:', types.items.map(type => ({
      id: type.sys.id,
      name: type.name,
      description: type.description
    })));
  } catch (error) {
    console.error('Error fetching content types:', error);
  }
})();

export async function getContentTypes(): Promise<ContentTypeCollection> {
  try {
    const response = await contentfulClient.getContentTypes();
    console.log(
      "Available content types:",
      response.items.map((type) => ({
        id: type.sys.id,
        name: type.name,
        fields: type.fields.map((field) => ({
          id: field.id,
          type: field.type,
          required: field.required,
        })),
      }))
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentfulError(
        `Failed to fetch content types: ${error.message}`,
        error
      );
    }
    throw new ContentfulError(
      "Failed to fetch content types: Unknown error",
      error
    );
  }
}

export async function listContentTypes() {
  try {
    const response = await contentfulClient.getContentTypes();
    console.log('All content types:', response.items.map(type => ({
      id: type.sys.id,
      name: type.name,
      displayField: type.displayField,
      fields: type.fields.map(f => ({ id: f.id, type: f.type }))
    })));
    return response;
  } catch (error) {
    console.error('Error listing content types:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

// Call this immediately to help debug
listContentTypes().catch(console.error);

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('Attempting to fetch blog posts...');
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      include: 2,
      order: ['-sys.createdAt'],
    });

    console.log('Response from Contentful:', {
      total: response.total,
      hasItems: !!response?.items?.length
    });

    if (!response?.items?.length) {
      console.log('No blog posts found');
      return [];
    }

    return response.items.map((item) => {
      if (!('fields' in item)) {
        throw new ContentfulError("Invalid blog post data: missing fields");
      }
      
      const { fields } = item as { fields: BlogPostSkeleton['fields'] };
      
      return {
        title: fields.title ?? "",
        slug: fields.slug ?? "",
        excerpt: fields.excerpt || "",
        content: fields.content || defaultDocument,        
        publishedDate: fields.publishedDate ?? "",
        tags: fields.tags || [],
        featuredImage: fields.featuredImage 
          ? {
              url: `https:${fields.featuredImage.fields.file.url}` || "",
              title: fields.featuredImage.fields.title || ""
            }
          : { url: "", title: "" },
        author: fields.author 
          ? {
              name: fields.author.fields.name,
              avatar: fields.author.fields.avatar
                ? { url: `https:${fields.author.fields.avatar.fields.file.url}` }
                : undefined
            }
          : undefined
      };
    });
  } catch (error) {
    // Log the full error details
    console.error('Detailed error in getBlogPosts:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw new ContentfulError('Failed to fetch blog posts', error);
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    throw new ContentfulError("Blog post slug is required");
  }

  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      include: 2,
    });

    if (!response?.items?.length) {
      return null;
    }

    const entry = response.items[0];

    // Type assertion to ensure type safety
    const fields = entry.fields as BlogPostSkeleton['fields'];

    return {
      title: fields.title ?? "",
      slug: fields.slug ?? "",
      excerpt: fields.excerpt || "",
      content: fields.content || defaultDocument,
      featuredImage: {
        url: fields.featuredImage?.fields?.file?.url
          ? `https:${fields.featuredImage.fields.file.url}`
          : "",
        title: fields.featuredImage?.fields?.title || fields.title || "",
      },
      author: fields.author?.fields
        ? {
            name: fields.author.fields.name ?? "",
            avatar: fields.author.fields.avatar?.fields?.file
              ? {
                  url: `https:${fields.author.fields.avatar.fields.file.url}`,
                }
              : undefined,
          }
        : undefined,
      publishedDate: fields.publishedDate ?? "",
      tags: fields.tags ?? []
    };
  } catch (error) {
    throw new ContentfulError("Failed to fetch blog post", error);
  }
}
