export const screens = {
  index: '/',
  explore: '/explore',
} as const;

export type ScreenName = keyof typeof screens;
