import axios from 'axios';
import { tmdbClient } from '@/lib/tmdb';
import { NextRequest, NextResponse } from 'next/server';
import { TVDetails } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tvId = parseInt(id);

    if (isNaN(tvId)) {
      return NextResponse.json({ error: 'Invalid TV ID' }, { status: 400 });
    }

    const response = await axios.get<TVDetails>(tmdbClient.getTVDetails(tvId));

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TV show details' },
      { status: 500 }
    );
  }
}
