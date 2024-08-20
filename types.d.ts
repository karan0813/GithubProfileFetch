// src/types.d.ts

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
}
