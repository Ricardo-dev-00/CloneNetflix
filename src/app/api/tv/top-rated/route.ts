import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { APIResponse, TV } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    const response = await axios.get<APIResponse<TV>>(tmdbClient.getTopRatedTV(parseInt(page)));

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching top rated TV shows:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top rated TV shows' },
      { status: 500 }
    );
  }
}
