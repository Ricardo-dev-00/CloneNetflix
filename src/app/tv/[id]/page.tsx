import type { Metadata } from 'next';
import TVDetails from '@/components/TVDetails';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

  try {
    const response = await fetch(`${baseUrl}/tv/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        title: 'Série não encontrada',
        description: 'A série que você está procurando não foi encontrada.',
      };
    }

    const show = await response.json();

    return {
      title: `${show.name} - NetflixClone`,
      description: show.overview || 'Assista a esta série em NetflixClone',
      openGraph: {
        title: show.name,
        description: show.overview,
        images: show.poster_path
          ? [`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${show.poster_path}`]
          : [],
        type: 'video.tv_show',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Série - NetflixClone',
    };
  }
}

export default async function TVPage({ params }: Props) {
  const id = (await params).id;
  return <TVDetails tvId={parseInt(id)} />;
}
