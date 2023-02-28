type RouteNames = 'paintings' | 'drawings' | 'other' | 'bio' | 'contact';

interface NavigationRoute {
  path: string;
  name: RouteNames;
}

export const NAVIGATION_ROUTES: NavigationRoute[] = [
  { path: '/paintings', name: 'paintings' },
  { path: '/drawings', name: 'drawings' },
  { path: '/other', name: 'other' },
  { path: '/bio', name: 'bio' },
  { path: '/contact', name: 'contact' },
];

export type NavigationRouteName = (typeof NAVIGATION_ROUTES)[number]['name'];
