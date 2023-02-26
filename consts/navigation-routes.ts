interface NavigationRoute {
  path: string;
  name: string;
}

export const NAVIGATION_ROUTES: NavigationRoute[] = [
  { path: '/paintings', name: 'paintings' },
  { path: '/drawings', name: 'drawings' },
  { path: '/other', name: 'other' },
  { path: '/bio', name: 'bio' },
  { path: '/contact', name: 'contact' },
];
