
export const APP_NAME = 'Daoverse';
export const APP_TAGLINE = 'Journey Through Cultivation Realms';
export const ITEMS_PER_PAGE = 12;
export const MAX_PAGE_BUTTONS = 5;
export const NOVEL_CATEGORIES = {
  WUXIA: 'wuxia',
  XIANXIA: 'xianxia',
  XUANHUAN: 'xuanhuan',
};


export const GENRES = [
  'action',
  'adventure',
  'martial arts',
  'cultivation',
  'fantasy',
  'romance',
  'drama',
  'mystery',
  'comedy',
  'tragedy',
  'sci-fi',
  'horror',
];

export const FILTER_TYPES = ['all', 'popularity', 'ratings'];


export const TRANSLATION_STATUS = [
  'Completed',
  'Ongoing',
  'Hiatus',
  'Dropped',
];


export const POPULAR_TAGS = [
  'Special abilities',
  'Reincarnation',
  'Male MC',
  'Weak-to-strong',
  'Family strife',
  'Familial love',
  'Transmigration',
  'System',
  'Revenge',
  'Overpowered',
];

export const FONT_FAMILIES = [
  { value: 'serif', label: 'Serif' },
  { value: 'sans-serif', label: 'Sans-Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Palatino, serif', label: 'Palatino' },
];

export const FONT_SIZES = {
  MIN: 12,
  MAX: 32,
  DEFAULT: 18,
  STEP: 2,
};


export const STORAGE_KEYS = {
  USERNAME: 'daoverse_username',
  PROFILE_PIC: 'daoverse_profile_pic',
  RECENT_READ: 'daoverse_recent_read',
  FAVORITES: 'daoverse_favorites',
  READING_PROGRESS: 'daoverse_reading_progress',
  THEME: 'daoverse_theme',
  FONT_PREFERENCE: 'daoverse_font_preference',
};

export const API_ENDPOINTS = {
  LATEST: '/latest',
  POPULAR: '/popular',
  MOST_RATED: '/most-rated',
  SEARCH: '/search',
  INFO: '/info',
  FILTER: '/filter',
  RECOMMENDATION: '/recommendation',
  VOLUMES: '/volumes',
  PUBLISHER: '/publisher',
};