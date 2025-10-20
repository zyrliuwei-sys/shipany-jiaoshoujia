import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHeader } from '@/shared/blocks/common';
import { MusicGenerator } from '@/shared/blocks/generator';
import { getMetadata } from '@/shared/lib/seo';
import { CTA, FAQ } from '@/themes/default/blocks';

export const generateMetadata = getMetadata({
  metadataKey: 'demo.ai-music-generator.metadata',
  canonicalUrl: '/demo/ai-music-generator',
});

export default async function GeneratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('landing');
  const tt = await getTranslations('demo.ai-music-generator');

  return (
    <>
      <PageHeader
        title={tt.raw('title')}
        description={tt.raw('description')}
        className="mt-16 -mb-32"
      />
      <MusicGenerator srOnlyTitle={tt.raw('h1-title')} />
      <FAQ faq={t.raw('faq')} />
      <CTA cta={t.raw('cta')} className="bg-muted" />
    </>
  );
}
