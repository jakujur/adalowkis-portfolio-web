export interface Artwork {
  id: string;
  description: string;
  title: string;
  image: {
    urlSmall: string;
    urlLarge: string;
  };
}
