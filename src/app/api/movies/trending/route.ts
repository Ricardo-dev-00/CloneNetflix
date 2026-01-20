import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { APIResponse, Movie } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const response = await axios.get<APIResponse<Movie>>(tmdbClient.getTrendingMovies(parseInt(page)));

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending movies' },
      { status: 500 }
    );
  }
}
