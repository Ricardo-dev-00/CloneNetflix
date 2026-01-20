import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { Genre } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'movie' | 'tv';

    if (!type || !['movie', 'tv'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid type parameter is required (movie or tv)' },
        { status: 400 }
      );
    }

    const response = await axios.get<{ genres: Genre[] }>(tmdbClient.getGenres(type));

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching genres:', error);
    return NextResponse.json(
      { error: 'Failed to fetch genres' },
      { status: 500 }
    );
  }
}
