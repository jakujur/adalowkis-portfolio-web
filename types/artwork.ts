import { Image } from '@/types/image';

export interface Artwork {
  id: string;
  description: string;
  title: string;
  image: {
    small: Image;
    large: Image;
  };
}
