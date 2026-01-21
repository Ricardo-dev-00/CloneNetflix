# NetflixClone 🎬

Uma aplicação web moderna e profissional inspirada na Netflix, desenvolvida com as tecnologias mais atuais do ecossistema JavaScript/React.

## 📸 Visão Geral

NetflixClone é um projeto full-stack que demonstra boas práticas de desenvolvimento frontend, com foco em:

- ✅ **Arquitetura Escalável**: Estrutura organizada e modular
- ✅ **SEO Otimizado**: Metadata dinâmica e Server-Side Rendering
- ✅ **Performance**: Imagens otimizadas, lazy loading e code splitting
- ✅ **Segurança**: API key nunca exposta no frontend
- ✅ **Tipagem Forte**: 100% TypeScript
- ✅ **UX Fluida**: Animações, loading states e design responsivo
- ✅ **Deploy Pronto**: Configurado para Vercel

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Styling utility-first
- **Axios** - Cliente HTTP

### API & Data
- **The Movie Database (TMDB)** - API de filmes e séries
- **Next.js API Routes** - Backend seguro
- **Server Actions** - Processamento no servidor

### Deploy
- **Vercel** - Hospedagem otimizada para Next.js

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── (home)/
│   │   └── page.tsx          # Página principal
│   ├── catalogo/
│   │   └── page.tsx          # Catálogo com filtros
│   ├── movie/[id]/
│   │   └── page.tsx          # Detalhes do filme
│   ├── tv/[id]/
│   │   └── page.tsx          # Detalhes da série
│   ├── api/
│   │   ├── movies/           # Endpoints de filmes
│   │   ├── tv/               # Endpoints de séries
│   │   ├── search/           # Endpoints de busca
│   │   ├── genres/           # Endpoints de gêneros
│   │   └── discover/         # Endpoints de descoberta
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Home page
├── components/
│   ├── Header.tsx            # Cabeçalho
│   ├── Footer.tsx            # Rodapé
│   ├── MovieCard.tsx         # Card individual
│   ├── MovieList.tsx         # Lista de filmes/séries
│   ├── MovieDetails.tsx      # Detalhes do filme
│   ├── TVDetails.tsx         # Detalhes da série
│   └── Skeletons.tsx         # Loaders
├── services/
│   └── movieService.ts       # Cliente HTTP
├── lib/
│   └── tmdb.ts               # Configuração TMDB
├── types/
│   └── index.ts              # Tipos TypeScript
└── styles/
    └── globals.css           # Estilos globais
```

## 🎯 Funcionalidades

### 🏠 Home
- Banner com filme em destaque
- Listas horizontais:
  - Filmes em alta
  - Filmes populares
  - Próximos lançamentos
  - Séries populares
- Loading states elegantes

### 📚 Catálogo
- Grid responsivo de filmes e séries
- Filtros por:
  - Tipo (filme/série)
  - Gênero
  - Busca por nome
- Paginação funcional
- Responsivo (mobile-first)

### 🎥 Página de Detalhes
- Informações completas:
  - Banner e poster
  - Sinopse
  - Nota e data
  - Gêneros
  - Trailer (YouTube)
  - Orçamento e receita
  - Países, idiomas, produtoras
- Seção de similares
- Metadata dinâmica para SEO

## 🔐 Segurança

A chave da API do TMDB é protegida:

```typescript
// ❌ NUNCA fazer isso no frontend:
const apiKey = "sua_chave";

// ✅ CORRETO - Usar API Routes:
// Frontend → API Route → TMDB
```

Todas as requisições ao TMDB são feitas através de API Routes, mantendo a chave segura no servidor.

## 📊 SEO & Performance

### SEO
- Metadata dinâmica via `generateMetadata()`
- Open Graph para compartilhamento
- Sitemap automático do Next.js
- Structured data

### Performance
- Imagens otimizadas com `next/image`
- Lazy loading automático
- Code splitting por rota
- Cache com `revalidate`
- Bundle otimizado

### Lighthouse
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 100

## 🛠️ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/netflix-clone.git
cd netflix-clone
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# TMDB API - Obtenha em https://www.themoviedb.org/settings/api
TMDB_API_KEY=sua_chave_aqui

# URLs
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
```
http://localhost:3000
```

## 📦 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `TMDB_API_KEY` | Chave da API TMDB (servidor) | `abc123...` |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | URL base para imagens | `https://image.tmdb.org/t/p/w500` |
| `NEXT_PUBLIC_API_BASE_URL` | URL da API interna | `http://localhost:3000/api` |

**Nota**: Variáveis com prefixo `NEXT_PUBLIC_` são expostas no cliente. A chave da API não tem este prefixo, mantendo-a segura.

## 🚀 Deploy na Vercel

### Passos

1. **Prepare o repositório**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Conecte ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Clique em "Import"

3. **Configure as variáveis de ambiente**
   - Na página do projeto, vá para "Settings" → "Environment Variables"
   - Adicione:
     - `TMDB_API_KEY` - Sua chave TMDB
     - `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` - `https://image.tmdb.org/t/p/w500`

4. **Deploy**
   - Clique em "Deploy"
   - Aguarde a construção completar

Sua aplicação estará disponível em: `https://seu-projeto.vercel.app`

## 📝 Commits Convencionais

Este projeto segue [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona página de detalhes
fix: corrige carregamento de imagens
docs: atualiza README
style: formata código
refactor: reorganiza estrutura
perf: otimiza performance
test: adiciona testes
chore: atualiza dependências
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📧 Contato

Desenvolvido com ❤️ por Ricardo

- 🔗 [LinkedIn](https://www.linkedin.com/in/ricardo-vieira-dev/)
- 🐙 [GitHub](https://github.com/Ricardo-dev-00)
- 📧 Email: ricardo.dev.of@gmail.com

## ⭐ Suporte

Se gostou do projeto, considere dar uma estrela! ⭐

---

**Última atualização**: Janeiro de 2024
