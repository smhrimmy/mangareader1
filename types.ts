export enum AppMode {
  MANGA = 'MANGA',
  NOVEL = 'NOVEL',
}

export enum ContentStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  HIATUS = 'Hiatus',
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  date: string;
  // For Manga: Array of image URLs
  images?: string[]; 
  // For Novel: HTML/Text content
  content?: string; 
}

export interface BaseContent {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  synopsis: string;
  tags: string[];
  status: ContentStatus;
  rating: number;
  views: string;
  lastUpdate: string;
}

export interface Manga extends BaseContent {
  type: 'MANGA';
  totalChapters: number;
}

export interface Novel extends BaseContent {
  type: 'NOVEL';
  totalChapters: number;
  wordCount: string;
}

export type ContentItem = Manga | Novel;

export interface UserStats {
  chaptersRead: number;
  hoursRead: number;
  streakDays: number;
  level: number;
}