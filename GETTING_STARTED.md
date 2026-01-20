# Instruções de Configuração Inicial

## 🎬 NetflixClone - First Steps

Bem-vindo! Aqui estão os passos para começar com o projeto.

## ⚡ Quick Start

### 1️⃣ Obtenha uma Chave TMDB

1. Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Faça login ou crie uma conta
3. Vá para "Settings" → "API"
4. Copie sua chave **v3 API Key**

### 2️⃣ Configure .env.local

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Copie o arquivo de exemplo
cp .env.local.example .env.local
```

Edite `.env.local` e adicione sua chave:

```env
# TMDB API Key - Obtenha em https://www.themoviedb.org/settings/api
TMDB_API_KEY=sua_chave_aqui

# URLs (não mude estes valores para desenvolvimento local)
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### 3️⃣ Instale as Dependências

```bash
npm install
```

### 4️⃣ Inicie o Servidor

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador!

## 📚 Documentação

- **[README.md](./README.md)** - Documentação completa do projeto
- **[DEPLOY.md](./DEPLOY.md)** - Guia de deployment
- **[API Routes](./src/app/api)** - Endpoints da API
- **[Componentes](./src/components)** - Componentes React

## 🗂️ Estrutura do Projeto

```
src/
├── app/              # Next.js App Router
├── components/       # Componentes React
├── services/         # Serviços HTTP
├── lib/              # Utilitários
├── types/            # TypeScript types
└── styles/           # CSS global
```

## 🔑 Variáveis de Ambiente

### Desenvolvimento (.env.local)

```env
TMDB_API_KEY=sua_chave_aqui
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Production (Vercel)

Configure as mesmas variáveis no dashboard do Vercel.

**Segurança**: `TMDB_API_KEY` não tem `NEXT_PUBLIC_` então fica privada no servidor!

## 🧪 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor com hot reload

# Production
npm run build        # Build para produção
npm run start        # Inicia servidor em modo produção

# Qualidade de código
npm run lint         # Verifica eslint
```

## 🐛 Troubleshooting

### Erro: "TMDB_API_KEY is not defined"

```bash
# Certifique-se de que .env.local existe e tem a chave
cat .env.local | grep TMDB_API_KEY
```

### Porta 3000 já em uso

```bash
# Mudar para uma porta diferente
npm run dev -- -p 3001
```

### Build falha

```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run build
```

## 📱 Testando em Diferentes Dispositivos

### Desktop
```bash
npm run dev
# Acesse http://localhost:3000
```

### Mobile (Mesmo WiFi)
```bash
# Descubra seu IP local
ipconfig getifaddr en0  # macOS/Linux
ipconfig              # Windows

# Acesse em outro dispositivo
# http://seu_ip_local:3000
```

## 🚀 Próximas Funcionalidades para Adicionar

- [ ] Autenticação de usuário
- [ ] Favorites/Watchlist
- [ ] Sistema de ratings
- [ ] Recomendações personalizadas
- [ ] Testes automatizados
- [ ] PWA (Progressive Web App)

## 📖 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TMDB API](https://developer.themoviedb.org/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

## 💡 Dicas

1. **Otimize Imagens**: Next.js já faz isso com `next/image`
2. **Lazy Loading**: Automático em `next/image`
3. **SEO**: Use `generateMetadata()` para metadata dinâmica
4. **Performance**: Use `npm run build` para testar build de produção

## ✨ Checklist de Desenvolvimento

- [ ] Testei localmente com `npm run dev`
- [ ] Testei em mobile
- [ ] Verifiquei performance com DevTools
- [ ] Testei todos os filtros do catálogo
- [ ] Testei página de detalhes
- [ ] Testei com diferentes tamas da rede

## 🤝 Contribuindo

Se quer adicionar features:

1. Crie uma branch: `git checkout -b feature/nova-feature`
2. Faça seus commits: `git commit -m 'feat: adiciona nova feature'`
3. Push: `git push origin feature/nova-feature`
4. Abra um Pull Request

## 📧 Suporte

Encontrou um bug? Abra uma [Issue](https://github.com/seu-usuario/netflix-clone/issues)

---

**Pronto para começar?** Rode `npm install && npm run dev` agora! 🚀
