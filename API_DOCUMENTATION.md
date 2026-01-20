# 🔌 API Documentation - NetflixClone

Documentação completa de todos os endpoints da API interna.

## 📋 Base URL

```
Development: http://localhost:3000/api
Production: https://seu-projeto.vercel.app/api
```

---

## 🎬 Movies Endpoints

### GET `/api/movies/popular`
Filmes populares.

**Query Parameters:**
- `page` (opcional, padrão: 1) - Número da página

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      "backdrop_path": "/rNzQyW4f8B8cQeg7h6PSYeUS0HP.jpg",
      "overview": "...",
      "release_date": "1999-10-15",
      "vote_average": 8.8,
      "genre_ids": [28, 53],
      "popularity": 28.5
    }
  ],
  "total_pages": 500,
  "total_results": 10000
}
```

**Exemplo:**
```bash
curl http://localhost:3000/api/movies/popular?page=1
```

---

### GET `/api/movies/trending`
Filmes em alta (tendência).

**Query Parameters:**
- `page` (opcional, padrão: 1)

**Response:** Mesmo formato de `/popular`

---

### GET `/api/movies/upcoming`
Próximos lançamentos.

**Query Parameters:**
- `page` (opcional, padrão: 1)

**Response:** Mesmo formato de `/popular`

---

### GET `/api/movies/:id`
Detalhes completos de um filme.

**Path Parameters:**
- `id` (obrigatório) - ID do filme (ex: 550)

**Response:**
```json
{
  "id": 550,
  "title": "Fight Club",
  "overview": "...",
  "release_date": "1999-10-15",
  "vote_average": 8.8,
  "runtime": 139,
  "budget": 63000000,
  "revenue": 100853753,
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 53, "name": "Thriller" }
  ],
  "production_companies": [...],
  "production_countries": [...],
  "spoken_languages": [...],
  "videos": {
    "results": [
      {
        "id": "abc123",
        "key": "video_key",
        "name": "Trailer",
        "site": "YouTube",
        "type": "Trailer"
      }
    ]
  },
  "similar": {
    "results": [...]
  }
}
```

**Exemplo:**
```bash
curl http://localhost:3000/api/movies/550
```

---

## 📺 TV Endpoints

### GET `/api/tv/trending`
Séries em alta.

**Query Parameters:**
- `page` (opcional, padrão: 1)

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 1399,
      "name": "Game of Thrones",
      "poster_path": "...",
      "backdrop_path": "...",
      "overview": "...",
      "first_air_date": "2011-04-17",
      "vote_average": 9.2,
      "genre_ids": [10765, 18],
      "popularity": 35.2
    }
  ],
  "total_pages": 200,
  "total_results": 4000
}
```

---

### GET `/api/tv/top-rated`
Séries melhor avaliadas.

**Query Parameters:**
- `page` (opcional, padrão: 1)

**Response:** Mesmo formato de `/trending`

---

### GET `/api/tv/:id`
Detalhes completos de uma série.

**Path Parameters:**
- `id` (obrigatório) - ID da série

**Response:**
```json
{
  "id": 1399,
  "name": "Game of Thrones",
  "overview": "...",
  "first_air_date": "2011-04-17",
  "vote_average": 9.2,
  "number_of_seasons": 8,
  "number_of_episodes": 73,
  "genres": [...],
  "created_by": [...],
  "networks": [...],
  "production_companies": [...],
  "production_countries": [...],
  "spoken_languages": [...],
  "last_episode_to_air": {
    "air_date": "2019-05-19",
    "episode_number": 6,
    "name": "The Iron Throne",
    "overview": "...",
    "season_number": 8
  },
  "videos": {...},
  "similar": {...}
}
```

---

## 🔍 Search Endpoints

### GET `/api/search/movies`
Buscar filmes por nome.

**Query Parameters:**
- `query` (obrigatório) - Termo de busca
- `page` (opcional, padrão: 1)

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster_path": "...",
      "overview": "...",
      "release_date": "1999-10-15",
      "vote_average": 8.8
    }
  ],
  "total_pages": 50,
  "total_results": 1000
}
```

**Exemplo:**
```bash
curl "http://localhost:3000/api/search/movies?query=fight+club&page=1"
```

---

### GET `/api/search/tv`
Buscar séries por nome.

**Query Parameters:**
- `query` (obrigatório) - Termo de busca
- `page` (opcional, padrão: 1)

**Response:** Mesmo formato de `/search/movies`

---

## 🎭 Genres Endpoints

### GET `/api/genres`
Listar todos os gêneros.

**Query Parameters:**
- `type` (obrigatório) - "movie" ou "tv"

**Response:**
```json
{
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
  ]
}
```

**Exemplo:**
```bash
curl "http://localhost:3000/api/genres?type=movie"
```

---

## 🔎 Discover Endpoint

### GET `/api/discover`
Descobrir filmes/séries por gênero.

**Query Parameters:**
- `type` (obrigatório) - "movie" ou "tv"
- `genreId` (obrigatório) - ID do gênero
- `page` (opcional, padrão: 1)

**Response:**
```json
{
  "page": 1,
  "results": [
    {
      "id": 550,
      "title": "Fight Club",
      "poster_path": "...",
      "overview": "...",
      "vote_average": 8.8
    }
  ],
  "total_pages": 200,
  "total_results": 4000
}
```

**Exemplo:**
```bash
curl "http://localhost:3000/api/discover?type=movie&genreId=28&page=1"
```

---

## ⚠️ Error Responses

Todos os endpoints podem retornar erros:

### 400 Bad Request
```json
{
  "error": "Query parameter is required"
}
```

### 404 Not Found
```json
{
  "error": "Movie not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch data"
}
```

---

## 🔄 Rate Limiting

A TMDB API tem limitações:
- **40 requisições por 10 segundos** (chave de desenvolvedor)
- **Sem limite** com conta paga

---

## 💾 Caching

O Next.js implementa cache automático:

```typescript
// Cache por 1 hora
const response = await fetch('...', {
  next: { revalidate: 3600 }
});
```

---

## 🧪 Testing com cURL

### Testar em desenvolvimento
```bash
# Popular movies
curl http://localhost:3000/api/movies/popular

# Trending movies (página 2)
curl "http://localhost:3000/api/movies/trending?page=2"

# Detalhes do filme 550
curl http://localhost:3000/api/movies/550

# Buscar "Matrix"
curl "http://localhost:3000/api/search/movies?query=matrix"

# Gêneros de filmes
curl "http://localhost:3000/api/genres?type=movie"

# Filmes de ação (ID 28)
curl "http://localhost:3000/api/discover?type=movie&genreId=28"
```

---

## 📱 Usando no Frontend

### Com Axios
```typescript
import movieService from '@/services/movieService';

// Filmes populares
const response = await movieService.getPopularMovies(1);
const movies = response.data.results;

// Detalhes do filme
const details = await movieService.getMovieDetails(550);
```

### Com Fetch API
```typescript
// Filmes populares
const response = await fetch('/api/movies/popular');
const data = await response.json();

// Com tratamento de erro
async function fetchMovies() {
  try {
    const response = await fetch('/api/movies/popular');
    if (!response.ok) throw new Error('Erro na busca');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

---

## 🔐 Segurança

- ✅ Chave TMDB protegida no servidor
- ✅ Sem exposição de secrets no cliente
- ✅ HTTPS em produção
- ✅ CORS configurado

---

## 📚 Referências

- [TMDB API Docs](https://developer.themoviedb.org/docs)
- [NextJS API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Última atualização**: Janeiro de 2024
