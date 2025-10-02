import type { ApiResponse } from '../types/index.ts';

const API_BASE = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
  console.log('Fetching page:', page);
  const response = await fetch(`${API_BASE}?page=${page}`);
//   console.log('Response:', response);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

