# Guia de Deploy - NetflixClone

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Repositório GitHub com o código
- Chave da API TMDB (obtenha em https://www.themoviedb.org/settings/api)

## 🚀 Deploy no Vercel (Recomendado)

### Passo 1: Prepare seu Repositório

```bash
# Certifique-se de que tudo está commitado
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Passo 2: Conecte ao Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Project"**
3. Selecione sua conta GitHub
4. Procure pelo repositório `netflix-clone` e clique em **"Import"**

### Passo 3: Configure as Variáveis de Ambiente

Na página de configuração do projeto:

1. Localize a seção **"Environment Variables"**
2. Adicione as seguintes variáveis:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `TMDB_API_KEY` | `sua_chave_aqui` | Sua chave da API TMDB (privada) |
| `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` | `https://image.tmdb.org/t/p/w500` | URL base para imagens |

**Importante**: Somente `NEXT_PUBLIC_*` são expostas no cliente. A chave da API está segura no servidor.

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos enquanto o Vercel constrói e faz deploy da aplicação
3. Você receberá uma URL do tipo: `https://seu-projeto.vercel.app`

## ✅ Verificar Deploy

Após o deploy:

- ✔️ Acesse a URL do seu projeto
- ✔️ Verifique se as imagens estão carregando
- ✔️ Teste a navegação entre páginas
- ✔️ Teste a busca e filtros no catálogo

## 🔄 Atualizações Automáticas

O Vercel está configurado para fazer deploy automático sempre que você faz push para `main`:

```bash
# Fazer alterações
git add .
git commit -m "feat: add new feature"
git push origin main

# Vercel deploy automaticamente em 1-2 minutos
```

## 🛠️ Deployment Local com Docker (Opcional)

Se preferir usar Docker:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build e execute:

```bash
docker build -t netflix-clone .
docker run -p 3000:3000 -e TMDB_API_KEY=sua_chave netflix-clone
```

## 🚨 Troubleshooting

### Erro: "TMDB_API_KEY is not defined"

- Verifique se você configurou a variável no Vercel
- Aguarde alguns minutos para Vercel redeployer
- Limpe o cache do navegador

### Erro: "Imagens não carregam"

- Confirme que `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` está correta
- Verifique a conexão de internet
- Verifique se o TMDB está acessível

### Erro: "Build falhou"

- Verifique os logs no dashboard do Vercel
- Certifique-se de que `npm run build` funciona localmente
- Verifique se não há erros de TypeScript

## 📊 Monitoramento

### Vercel Analytics

1. No dashboard do Vercel, vá para **"Analytics"**
2. Monitore:
   - Web Vitals
   - Performance
   - Error rates

### Logs

Para visualizar logs em tempo real:

```bash
# Se você tem a CLI Vercel instalada
vercel logs seu-projeto.vercel.app
```

## 🔐 Segurança

✅ **Boas práticas implementadas:**

- API key nunca exposta no código cliente
- Variáveis de ambiente seguras no Vercel
- HTTPS ativado por padrão
- Headers de segurança configurados

## 📈 Performance

O Vercel otimiza automaticamente:

- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic code splitting
- ✅ Zero-config deployments

## 🎯 Próximos Passos

1. **Domínio Customizado**: Configure um domínio no Vercel
2. **Analytics**: Ative Google Analytics
3. **Monitoramento**: Use Sentry para error tracking
4. **CI/CD**: Configure testes automáticos

---

**Dúvidas?** Acesse a [documentação do Vercel](https://vercel.com/docs)
