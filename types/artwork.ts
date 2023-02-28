import { Image } from '@/types/image';

export interface ImageObject {
  small: Image;
  large: Image;
}

export interface Artwork {
  id: string;
  description: string;
  title: string;
  image: ImageObject;
}

export interface MediaObject<T> {
  title: string;
  description: string;
  mediaFile: T;
}
