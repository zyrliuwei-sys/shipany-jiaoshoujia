import type { TOCItemType as FumadocsTOCItemType } from 'fumadocs-core/server';

export type TOCItemType = FumadocsTOCItemType;

/**
 * Generate TOC (Table of Contents) from markdown/MDX content
 * Compatible with fumadocs TOCItemType format
 */
export function generateTOC(content: string): TOCItemType[] {
  if (!content) return [];

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TOCItemType[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const url = `#${generateHeadingId(text)}`;

    toc.push({
      title: text,
      url,
      depth: level,
    });
  }

  return toc;
}

/**
 * Generate heading ID from text
 * This should match the ID generation in your MDX renderer
 */
function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
