# Deploy na Vercel - Passo a Passo

## 1. Criar Conta na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **Sign Up**
3. Conecte com sua conta do GitHub

## 2. Importar Projeto

1. No dashboard da Vercel, clique em **Add New** → **Project**
2. Selecione o repositório **CloneNetflix** da lista
3. Clique em **Import**

## 3. Configurar Variáveis de Ambiente

**IMPORTANTE**: Antes de fazer o deploy, você precisa adicionar a chave da API.

### Na tela de configuração do projeto:

1. Procure a seção **Environment Variables**
2. Adicione a seguinte variável:

   ```
   Name:  TMDB_API_KEY
   Value: b552d23e3113b2df32cb26592564206c
   ```

3. Selecione todos os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Clique em **Add**

### Outras variáveis (já configuradas automaticamente):

A Vercel detecta automaticamente estas variáveis do seu código:
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`
- `NEXT_PUBLIC_API_BASE_URL`

## 4. Deploy

1. Após configurar a variável, clique em **Deploy**
2. Aguarde 2-3 minutos enquanto o projeto é construído
3. Quando finalizar, você verá uma mensagem de sucesso com o link do site

## 5. Acessar o Site

Seu site estará disponível em:
```
https://clone-netflix-seu-usuario.vercel.app
```

## 6. Adicionar/Editar Variáveis Posteriormente

Se precisar modificar variáveis depois do deploy:

1. Acesse seu projeto no dashboard da Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione, edite ou remova variáveis
4. Clique em **Save**
5. Faça um **Redeploy** para aplicar as mudanças:
   - Vá em **Deployments**
   - Clique nos três pontinhos (...) do último deploy
   - Selecione **Redeploy**

## 7. Deploy Automático

A partir de agora, **todo push para o GitHub** fará um deploy automático:

```bash
git add .
git commit -m "Atualização do projeto"
git push
```

A Vercel automaticamente:
- Detecta o push
- Faz build do projeto
- Publica a nova versão
- Mantém as variáveis de ambiente configuradas

## Troubleshooting

### Erro: "TMDB_API_KEY is not defined"
- Verifique se a variável foi adicionada corretamente
- Certifique-se que está em **Production**
- Faça um redeploy

### Build falhou
- Verifique os logs no painel da Vercel
- Certifique-se que o build funciona localmente: `npm run build`

### Imagens não carregam
- Verifique se `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` está configurada
- Valor correto: `https://image.tmdb.org/t/p/original`

## Domínio Personalizado (Opcional)

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções da Vercel
4. Aguarde propagação (até 48h)

---

## Resumo Rápido

```bash
# 1. Faça push do código
git push origin main

# 2. Na Vercel:
- Import do repositório
- Add Environment Variable: TMDB_API_KEY = b552d23e3113b2df32cb26592564206c
- Deploy

# 3. Pronto! 🚀
```
