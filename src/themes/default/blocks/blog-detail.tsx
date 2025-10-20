'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  getTocItems,
  MarkdownPreview,
  type TocItem,
} from '@/shared/blocks/common';
import { Crumb } from '@/shared/blocks/common/crumb';
import { type Post as PostType } from '@/shared/types/blocks/blog';
import { NavItem } from '@/shared/types/blocks/common';

export function BlogDetail({ post }: { post: PostType }) {
  const t = useTranslations('blog.page');

  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  const crumbItems: NavItem[] = [
    {
      title: t('crumb'),
      url: '/blog',
      is_active: false,
    },
    {
      title: post.title || '',
      url: `/blog/${post.slug}`,
      is_active: true,
    },
  ];

  useEffect(() => {
    if (post.content) {
      const toc = getTocItems(post.content);
      setTocItems(toc);
    }
  }, [post.content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.getBoundingClientRect().top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Update URL hash
      window.history.pushState(null, '', `#${id}`);

      // Calculate offset to account for fixed header
      const header =
        document.querySelector('header') || document.querySelector('nav');
      const headerOffset = header ? header.offsetHeight + 96 : 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id={post.id}>
      <div className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <Crumb items={crumbItems} />

          {/* Header Section */}
          <div className="mt-16 text-center">
            <h1 className="text-foreground mx-auto mb-4 w-full text-3xl font-bold md:max-w-4xl md:text-4xl">
              {post.title}
            </h1>
            <div className="text-muted-foreground mb-8 flex items-center justify-center gap-4 text-sm">
              {post.author_name && <span>By {post.author_name}</span>}
              {post.created_at && <span>{post.created_at}</span>}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 hidden md:block">
                <div className="bg-muted/30 rounded-lg">
                  <h2 className="text-foreground px-6 pt-4 font-semibold">
                    {t('toc')}
                  </h2>
                  {tocItems.length > 0 ? (
                    <nav className="space-y-2 p-4">
                      {tocItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`line-clamp-1 block w-full cursor-pointer rounded-md py-1 text-left text-sm transition-colors ${
                            activeId === item.id
                              ? 'bg-primary text-primary-foreground font-medium'
                              : 'hover:bg-muted hover:text-muted-foreground text-muted-foreground'
                          }`}
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                          {item.text}
                        </li>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-muted-foreground p-6 text-sm">
                      {t('no_content')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content - Center */}
            <div className="lg:col-span-6">
              <article className="p-0">
                {post.content && (
                  <div className="prose prose-lg text-muted-foreground max-w-none space-y-6 *:leading-relaxed">
                    <MarkdownPreview content={post.content} />
                  </div>
                )}
              </article>
            </div>

            {/* Author Info - Right Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="text-center">
                    {post.author_image && (
                      <div className="ring-foreground/10 mx-auto mb-4 aspect-square size-20 overflow-hidden rounded-xl border border-transparent shadow-md ring-1 shadow-black/15">
                        <img
                          src={post.author_image}
                          alt={post.author_name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-foreground mb-1 text-lg font-semibold">
                      {post.author_name}
                    </p>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {post.author_role}
                    </p>
                    <div className="text-muted-foreground space-y-1 text-xs">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
