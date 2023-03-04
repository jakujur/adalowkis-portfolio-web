import { Event } from '@/types/event';

export interface Bio {
  bio: string;
  singleEvents?: Event[];
  groupEvents?: Event[];
}
