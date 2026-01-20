import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { APIResponse, Movie, TV } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') as 'movie' | 'tv';
    const genreId = parseInt(searchParams.get('genreId') || '0');
    const page = parseInt(searchParams.get('page') || '1');

    if (!type || !['movie', 'tv'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid type parameter is required (movie or tv)' },
        { status: 400 }
      );
    }

    if (isNaN(genreId) || genreId <= 0) {
      return NextResponse.json(
        { error: 'Valid genreId parameter is required' },
        { status: 400 }
      );
    }

    const response = await axios.get<APIResponse<Movie | TV>>(
      tmdbClient.getByGenre(type, genreId, page)
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error discovering by genre:', error);
    return NextResponse.json(
      { error: 'Failed to discover by genre' },
      { status: 500 }
    );
  }
}
