# ✅ Pre-Deployment Checklist

Use este checklist antes de fazer deploy em produção.

## 🔍 Validação Local

### Build & Compilação
- [ ] `npm run build` sem erros
- [ ] `npm run build` sem warnings críticos
- [ ] `npm run lint` sem errors
- [ ] Nenhuma variável TypeScript não definida
- [ ] Nenhum `console.log()` no código de produção
- [ ] Nenhum `debugger` no código

### Funcionalidades
- [ ] Home page carrega corretamente
- [ ] Catálogo carrega e filtra corretamente
- [ ] Busca funciona
- [ ] Página de detalhes carrega completamente
- [ ] Links de navegação funcionam
- [ ] Mobile responsivo (testar em 375px, 768px, 1200px)
- [ ] Dark mode/tema está correto

### Performance
- [ ] Imagens carregam rapidamente
- [ ] Nenhuma imagem quebrada (404)
- [ ] Lazy loading funciona
- [ ] Bundle size é razoável (< 200KB)
- [ ] Chrome DevTools Lighthouse:
  - [ ] Performance > 85
  - [ ] Accessibility > 85
  - [ ] Best Practices > 90
  - [ ] SEO > 95

### Segurança
- [ ] Nenhuma chave de API exposta
- [ ] `.env.local` não foi commitado
- [ ] Variáveis sensíveis usam prefixo sem `NEXT_PUBLIC_`
- [ ] Nenhum secret no código
- [ ] HTTPS está forçado em produção

### API & Data
- [ ] API Routes funcionam em `/api/*`
- [ ] TMDB_API_KEY está definida em `.env.local`
- [ ] Requisições para TMDB funcionam
- [ ] Tratamento de erros está presente
- [ ] Timeout está configurado

### Navegação & UX
- [ ] Todos os links funcionam
- [ ] Nenhum link quebrado (404)
- [ ] Back button funciona
- [ ] Paginação funciona
- [ ] Loading states aparecem
- [ ] Error messages aparecem quando apropriado
- [ ] Animações funcionam suavemente

### Metadata & SEO
- [ ] `<title>` está preenchido
- [ ] `<meta name="description">` está preenchido
- [ ] Open Graph tags estão presentes
- [ ] Favicon existe
- [ ] Robots.txt existe
- [ ] Sitemap é gerado automaticamente

### Banco de Dados & Cache
- [ ] Nenhuma query desnecessária
- [ ] Cache está configurado com `revalidate`
- [ ] ISR (Incremental Static Regeneration) funciona

---

## 🔧 Configuração Vercel

### Antes de Push
- [ ] Código commitado localmente
- [ ] Git branch está limpa (sem alterações não commitadas)
- [ ] `.gitignore` está correto
- [ ] `.env.local` não está no git

### Variáveis de Ambiente
- [ ] `TMDB_API_KEY` definida no Vercel
- [ ] `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` definida
- [ ] Nenhuma variável sensível exposta publicamente

### Configuração do Projeto
- [ ] Nome do projeto é apropriado
- [ ] Domínio está configurado (opcional)
- [ ] Build command está correto: `npm run build`
- [ ] Output directory está correto: `.next`
- [ ] Install command está correto: `npm install`

---

## 📱 Testes Finais

### Diferentes Dispositivos
- [ ] Teste no desktop (Windows, Mac)
- [ ] Teste no mobile (iOS, Android)
- [ ] Teste em tablets
- [ ] Teste em diferentes navegadores:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

### Diferentes Velocidades de Conexão
- [ ] Teste com 3G rápido (DevTools)
- [ ] Teste com 4G (DevTools)
- [ ] Teste offline (o que acontece?)

### Diferentes Telas
- [ ] Tela muito pequena (320px)
- [ ] Tela pequena (375px)
- [ ] Tela média (768px)
- [ ] Tela grande (1200px+)

---

## 📋 Documentação

### Arquivos Necessários
- [ ] README.md está completo
- [ ] GETTING_STARTED.md existe
- [ ] DEPLOY.md existe
- [ ] API_DOCUMENTATION.md existe
- [ ] BEST_PRACTICES.md existe

### Conteúdo da Documentação
- [ ] Instruções de setup estão claras
- [ ] Como rodar localmente está descrito
- [ ] Como fazer deploy está explicado
- [ ] Variáveis de ambiente estão documentadas
- [ ] Estrutura do projeto está explicada
- [ ] Comandos disponíveis estão listados

---

## 🚀 Deploy Process

### GitHub
```bash
# 1. Fazer commit final
git add .
git commit -m "chore: final pre-deployment checks"

# 2. Push para main
git push origin main

# 3. Aguardar Vercel
# (Você verá notificações de deploy no Vercel)
```

### Vercel Dashboard
- [ ] Deployment iniciado automaticamente
- [ ] Todos os checks passaram (✅)
- [ ] Build foi bem-sucedido
- [ ] Preview URL está funcionando
- [ ] Production URL está funcionando

---

## ✅ Pós-Deployment

### Verificações Imediatas (0-5 min após deploy)
- [ ] Site principal carrega
- [ ] Página inicial funciona
- [ ] Imagens carregam
- [ ] Nenhum erro no console (F12)
- [ ] Analytics carrega (se configurado)

### Verificações em 1-2 horas
- [ ] Lighthouse passou novamente em produção
- [ ] Nenhum erro em produção
- [ ] Performance está boa
- [ ] Usuários conseguem acessar
- [ ] Catálogo carrega completamente

### Monitoramento Contínuo
- [ ] Verificar Vercel Analytics diariamente
- [ ] Monitorar error rates
- [ ] Verificar Web Vitals
- [ ] Responder rapidamente a erros
- [ ] Coletar feedback de usuários

---

## 🎯 Problemas Comuns

### Site não carrega
- [ ] Verificar se TMDB_API_KEY está definida no Vercel
- [ ] Verificar logs no Vercel dashboard
- [ ] Verificar se o build foi bem-sucedido

### Imagens não carregam
- [ ] Verificar `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`
- [ ] Confirmar que é a URL correta
- [ ] Testar conexão com TMDB

### Performance lenta
- [ ] Verificar Web Vitals no Lighthouse
- [ ] Otimizar imagens
- [ ] Ativar cache com `revalidate`
- [ ] Remover requests desnecessárias

### Erros em console
- [ ] Verificar DevTools Console em produção
- [ ] Procurar por 404s em assets
- [ ] Verificar CORS issues
- [ ] Checar TypeScript errors

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs do Vercel**
   - Dashboard → Deployments → Logs

2. **Verifique console do navegador**
   - F12 → Console → procure por erros

3. **Verifique .env.local localmente**
   - Confirme que `TMDB_API_KEY` está definida

4. **Tente rebuild**
   - Vercel Dashboard → Deployments → Redeploy

---

## ✨ Checklist Final

Todos os itens respondidos com ✅?

Se sim:

```
🎉 Parabéns! Seu projeto está pronto para produção! 🎉

Próximos passos:
1. Compartilhe a URL com amigos
2. Monitore o desempenho
3. Corrija bugs rapidamente
4. Colete feedback
5. Planeje melhorias futuras
```

---

**Última atualização**: Janeiro de 2024
**Versão**: 1.0.0
