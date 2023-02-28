import { Image } from '@/types/image';

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage: Image;
}
