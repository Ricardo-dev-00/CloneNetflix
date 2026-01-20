import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { APIResponse, TV } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const response = await axios.get<APIResponse<TV>>(
      tmdbClient.searchTV(query, page)
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return NextResponse.json(
      { error: 'Failed to search TV shows' },
      { status: 500 }
    );
  }
}
