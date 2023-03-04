import { Link } from '@/types/link';

const mapLinkResponseToLink = ({ id, attributes }: any): Link => ({
  id,
  name: attributes.name,
  href: attributes.href,
});

export const mapLinksResponseToLinks = (links: any): Link[] => links?.map(mapLinkResponseToLink);
