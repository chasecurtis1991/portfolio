import { createClient } from "contentful";
import { Document, BLOCKS } from "@contentful/rich-text-types";
import type {
  ContentTypeCollection,
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

export type { BlogPost };

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

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      include: 2,
      order: ['-sys.createdAt'],
    });

    if (!response?.items?.length) {
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
    console.error('Error fetching blog posts:', error instanceof Error ? error.message : 'Unknown error');
    throw new ContentfulError('Failed to fetch blog posts', error);
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!slug) {
    throw new ContentfulError("Blog post slug is required");
  }

  try {
    const response = await (contentfulClient.getEntries as Function)({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    }) as Awaited<ReturnType<typeof contentfulClient.getEntries<BlogPostSkeleton>>>;

    if (!response?.items?.length) {
      return null;
    }

    const entry = response.items[0];
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
