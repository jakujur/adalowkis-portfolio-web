import { Image } from '@/types/image';

export type ArtworkFormat = 'image' | 'video';

export interface Artwork {
  id: string;
  description: string;
  title: string;
  format: ArtworkFormat;
  coverImage: Image;
  previewImage: Image;
}
