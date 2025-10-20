import moment from 'moment';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import {
  PostType as DBPostType,
  getPosts,
  PostStatus,
} from '@/shared/services/post';
import {
  getTaxonomies,
  TaxonomyStatus,
  TaxonomyType,
} from '@/shared/services/taxonomy';
import {
  Blog as BlogType,
  Category as CategoryType,
  Post as PostType,
} from '@/shared/types/blocks/blog';

export const generateMetadata = getMetadata({
  metadataKey: 'blog.metadata',
  canonicalUrl: '/blog',
});

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: number; pageSize?: number }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // load blog data
  const t = await getTranslations('blog');

  let posts: PostType[] = [];
  let categories: CategoryType[] = [];

  // current category data
  const currentCategory: CategoryType = {
    id: 'all',
    slug: 'all',
    title: t('page.all'),
    url: `/blog`,
  };

  try {
    // todo: get posts from content dir

    const { page: pageNum, pageSize } = await searchParams;
    const page = pageNum || 1;
    const limit = pageSize || 30;

    // get blog posts
    const postsData = await getPosts({
      type: DBPostType.ARTICLE,
      status: PostStatus.PUBLISHED,
      page,
      limit,
    });

    // get blog categories
    const categoriesData = await getTaxonomies({
      type: TaxonomyType.CATEGORY,
      status: TaxonomyStatus.PUBLISHED,
    });

    // build categoties data
    categories = categoriesData.map((category) => ({
      id: category.id,
      slug: category.slug,
      title: category.title,
      url: `/blog/category/${category.slug}`,
    }));
    categories.unshift(currentCategory);

    // build posts data
    posts = postsData.map((post) => ({
      id: post.id,
      title: post.title || '',
      description: post.description || '',
      author_name: post.authorName || '',
      author_image: post.authorImage || '',
      created_at: moment(post.createdAt).format('MMM D, YYYY') || '',
      image: post.image || '',
      url: `/blog/${post.slug}`,
    }));
  } catch (error) {
    console.log('getting posts failed:', error);
  }

  // build blog data
  const blog: BlogType = {
    ...t.raw('blog'),
    categories,
    currentCategory,
    posts,
  };

  // load page component
  const Page = await getThemePage('blog');

  return <Page locale={locale} blog={blog} />;
}
