import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Link as LinkType } from '@/types/link';
import Link from 'next/link';
import { getLinks } from '@/features/links';

interface OthersPageProps {
  links: LinkType[];
}

export default function BioPage({ links }: OthersPageProps) {
  if (!links) return null;

  return (
    <div className="flex flex-col">
      {links.map((link) => (
        <Link className="hover:text-zinc-400" href={link.href} key={link.id}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const links = await getLinks();

  return {
    props: {
      links,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
