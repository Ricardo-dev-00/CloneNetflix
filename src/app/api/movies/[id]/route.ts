import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { MovieDetails } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movieId = parseInt(id);

    if (isNaN(movieId)) {
      return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
    }

    const response = await axios.get<MovieDetails>(tmdbClient.getMovieDetails(movieId));

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie details' },
      { status: 500 }
    );
  }
}
