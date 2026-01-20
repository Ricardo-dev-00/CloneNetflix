# 🎓 Boas Práticas - Manutenção e Desenvolvimento

Este guia descreve as boas práticas implementadas no projeto e como manter o código de qualidade.

## 📐 Padrões de Código

### TypeScript
```typescript
// ✅ BOM: Tipos explícitos
interface Movie {
  id: number;
  title: string;
  vote_average: number;
}

// ❌ EVITAR: Tipos implícitos
const movie = { id: 1, title: 'Film', rating: 8.5 };
```

### React Components
```typescript
// ✅ BOM: Componente funcional com tipos
interface HeaderProps {
  title: string;
  isVisible?: boolean;
}

export default function Header({ title, isVisible = true }: HeaderProps) {
  return isVisible ? <h1>{title}</h1> : null;
}

// ❌ EVITAR: Componente sem tipos
export default function Header(props) {
  return <h1>{props.title}</h1>;
}
```

### Async/Await
```typescript
// ✅ BOM: Tratamento de erro
async function fetchData() {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// ❌ EVITAR: Sem tratamento de erro
async function fetchData() {
  const response = await axios.get('/api/data');
  return response.data;
}
```

## 🗂️ Estrutura de Pastas

### Organização Recomendada
```
src/
├── app/                  # Next.js pages e API
├── components/           # React components
│   ├── Common/          # Componentes reutilizáveis
│   ├── Layout/          # Layout components
│   └── Features/        # Feature-specific components
├── services/            # API clients
├── lib/                 # Utilities e helpers
├── types/               # TypeScript types
├── styles/              # CSS global
└── hooks/               # Custom React hooks
```

## 🎯 Commits Convencionais

Sempre use conventional commits:

```bash
# Feature
git commit -m "feat: add search functionality"

# Bug fix
git commit -m "fix: correct image loading issue"

# Documentation
git commit -m "docs: update README"

# Style
git commit -m "style: format code with prettier"

# Refactor
git commit -m "refactor: simplify movie list component"

# Performance
git commit -m "perf: optimize image loading"

# Tests
git commit -m "test: add unit tests for MovieCard"
```

## 📝 Comments e Documentação

### Quando Adicionar Comentários
```typescript
// ✅ BOM: Explica o porquê, não o que
// Usa searchParams em vez de useRouter para cache de URL
const { searchParams } = new URL(request.url);

// ❌ EVITAR: Óbvio demais
// Obtém os parâmetros de busca
const { searchParams } = new URL(request.url);
```

### JSDoc para Funções Públicas
```typescript
/**
 * Busca filmes populares da API TMDB
 * @param page - Número da página (padrão: 1)
 * @returns Promise com array de filmes
 * @throws Error se a requisição falhar
 */
export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  // ...
}
```

## 🔍 Código Review - Checklist

Antes de fazer commit:

- [ ] TypeScript sem erros (`npm run build`)
- [ ] Linting passou (`npm run lint`)
- [ ] Nenhuma variável não utilizada
- [ ] Nenhum console.log deixado
- [ ] Imports organizados
- [ ] Nomes de variáveis são descritivos
- [ ] Funções têm responsabilidade única
- [ ] Componentes são reutilizáveis
- [ ] Erros são tratados
- [ ] Performance é considerada

## 🚀 Otimizações Recomendadas

### 1. Imagens
```typescript
// ✅ BOM: Next.js Image com otimizações
import Image from 'next/image';

<Image
  src={url}
  alt="description"
  width={300}
  height={450}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isBelowTheFold}
/>

// ❌ EVITAR: <img> simples
<img src={url} alt="description" />
```

### 2. Data Fetching
```typescript
// ✅ BOM: Cache com revalidate
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetch('...', {
    next: { revalidate: 3600 } // Cache 1 hora
  });
}

// ❌ EVITAR: Sem cache
const data = await fetch('...');
```

### 3. Bundle Size
```typescript
// ✅ BOM: Dynamic import para componentes pesados
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <SkeletonLoader />
});

// ❌ EVITAR: Import estático desnecessário
import HeavyComponent from './Heavy';
```

## 🧪 Testando Localmente

### Build de Produção
```bash
npm run build
npm start

# Testa em http://localhost:3000
# Valida que build funciona antes de deploy
```

### Validar Performance
```bash
# Chrome DevTools → Lighthouse
# Ou
npm run build
npx http-server ./out
```

### Testar em Múltiplos Dispositivos
```bash
# Descobrir IP local
ipconfig # Windows
ifconfig # Linux/Mac

# Acessar em outro dispositivo
http://seu_ip_local:3000
```

## 🔐 Variáveis de Ambiente

### Regra Importante
```
NEXT_PUBLIC_* = Exposto no cliente (NÃO use secrets)
Sem prefixo = Privado no servidor (USE para secrets)
```

### Exemplo
```env
# ✅ BOM: Public
NEXT_PUBLIC_API_URL=https://api.example.com

# ❌ NUNCA: Secret com NEXT_PUBLIC_
NEXT_PUBLIC_API_KEY=sk_live_123abc

# ✅ BOM: Secret privado
DATABASE_PASSWORD=secreto123
TMDB_API_KEY=chave_secreta
```

## 📊 Monitoramento em Produção

### Vercel Analytics
1. Dashboard do Vercel
2. Aba "Analytics"
3. Monitor Web Vitals

### Logs
```bash
# Ver logs em tempo real
vercel logs seu-projeto.vercel.app

# Ou no dashboard Vercel
# → Deployments → Logs
```

## 🐛 Debugging

### DevTools do Next.js
```bash
npm run dev
# Abrir http://localhost:3000
# F12 → Console/Network/Performance
```

### Logging Estruturado
```typescript
// ✅ BOM: Logs estruturados
console.log('[MovieService]', 'Fetching movie', { movieId, timestamp: new Date() });

// ❌ EVITAR: Logs genéricos
console.log('loading...');
```

## 📈 Melhorias Contínuas

### Performance
1. Usar Lighthouse regularmente
2. Monitorar Core Web Vitals
3. Otimizar imagens
4. Cache de dados

### Código
1. Code review com pair programming
2. Refactoring de código duplicado
3. Atualizar dependências mensalmente
4. Remover código não utilizado

### Segurança
1. Dependências sempre atualizadas
2. Secrets em variáveis de ambiente
3. CORS configurado corretamente
4. Headers de segurança

## 🎓 Recursos para Aprender Mais

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Patterns](https://react.dev/learn)
- [TypeScript Tips](https://www.typescriptlang.org/docs/handbook/)
- [Web Performance](https://web.dev/performance/)
- [Web Security](https://web.dev/security/)

## 💡 Dicas Profissionais

1. **Sempre commitar com mensagens descritivas**
2. **Testar localmente antes de fazer push**
3. **Usar branches para features**
4. **Code review antes de merge**
5. **Manter documentação atualizada**
6. **Monitorar performance em produção**
7. **Responder rapidamente a erros**
8. **Aprender com falhas**

---

**Mantendo este padrão, você terá um projeto profissional, escalável e fácil de manter!** 🎯
