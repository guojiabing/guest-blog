import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(), description: z.string(), date: z.coerce.date(),
      tags: z.array(z.string()), category: z.string(),
      draft: z.boolean().default(false), featured: z.boolean().default(false),
      sourceUrl: z.string().url().optional(),
    }),
  }),
};
