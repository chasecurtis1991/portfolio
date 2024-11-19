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

interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: "pageBlogPost";
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    shortDescription?: string;
    content: Document;
    featuredImage?: {
      fields: AssetFields;
      sys: { type: "Asset"; id: string };
    };
    author?: {
      fields: {
        name: string;
        avatar?: {
          fields: AssetFields;
          sys: { type: "Asset"; id: string };
        };
      };
      sys: { type: "Entry"; id: string };
    };
    publishedDate: string;
    tags?: string[];
  };
}

export interface BlogPost {
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
export const contentfulClient = createClient({
  space: spaceId,
  accessToken: accessToken,
  environment: "master",
});

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

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'pageBlogPost',
      include: 2,
    });

    if (!response?.items?.length) {
      return [];
    }

    return response.items.map((item) => {
      // Add a type guard to ensure fields exist
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
              url: fields.featuredImage.fields.file.url || "",
              title: fields.featuredImage.fields.title || ""
            }
          : { url: "", title: "" },
        author: fields.author 
          ? {
              name: fields.author.fields.name || "",
              avatar: fields.author.fields.avatar 
                ? { url: fields.author.fields.avatar.fields.file.url || "" }
                : undefined
            }
          : undefined
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new ContentfulError('Failed to fetch blog posts', error);
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    throw new ContentfulError("Blog post slug is required");
  }

  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'pageBlogPost',
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
      excerpt: fields.excerpt || fields.shortDescription || "",
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
