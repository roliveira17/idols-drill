# 🚀 Guia Completo de Deploy - Idol's Drill

## ✅ Status Atual
- ✅ Git inicializado
- ✅ Commit inicial feito (d810fd4)
- ✅ Branch renomeada para `main`
- ✅ Build testado e funcionando
- ✅ Vercel CLI instalado

---

## 📋 Passos para Deploy

### **1️⃣ Criar Repositório no GitHub**

1. Acesse: https://github.com/new
2. Preencha:
   - **Repository name**: `idols-drill`
   - **Description**: `Exercício introspectivo com IA para descobrir seu Ídolo Mestre - 4 ídolos (Dinheiro, Poder, Prazer, Fama)`
   - **Visibility**: Public ou Private (sua escolha)
   - **⚠️ IMPORTANTE**: NÃO marque "Add a README file"
3. Clique em **"Create repository"**

### **2️⃣ Conectar Repositório Local ao GitHub**

Copie a URL do seu repositório (ex: `https://github.com/SEU-USUARIO/idols-drill.git`)

Depois execute no terminal:

```bash
cd /c/projetos/4idol/designapp

# Adicionar remote (SUBSTITUA SEU-USUARIO pelo seu usuário do GitHub)
git remote add origin https://github.com/SEU-USUARIO/idols-drill.git

# Verificar se foi adicionado
git remote -v

# Push inicial
git push -u origin main
```

Se pedir autenticação:
- **Username**: seu usuário do GitHub
- **Password**: use um Personal Access Token (não a senha)
  - Criar token: https://github.com/settings/tokens
  - Scopes necessários: `repo` (full control of private repositories)

---

### **3️⃣ Deploy na Vercel**

#### **Opção A: Via Interface Web (Mais Fácil)**

1. Acesse: https://vercel.com/login
2. Faça login (pode usar conta GitHub)
3. Clique em **"Add New..."** → **"Project"**
4. Clique em **"Import Git Repository"**
5. Autorize a Vercel a acessar seu GitHub (se necessário)
6. Selecione o repositório **`idols-drill`**
7. Configure:
   - **Framework Preset**: Next.js ✅ (detectado automaticamente)
   - **Root Directory**: `./` (raiz)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

8. **⚠️ CRÍTICO - Adicionar Variável de Ambiente:**
   - Clique em **"Environment Variables"**
   - Adicione:
     - **Key**: `GROQ_API_KEY`
     - **Value**: `gsk_sua_chave_aqui` (pegue em https://console.groq.com/keys)
     - **Environments**: Marque **Production**, **Preview**, **Development**
   - Clique em **"Add"**

9. Clique em **"Deploy"**
10. Aguarde 2-3 minutos ⏳
11. ✅ Deploy concluído! Vercel vai mostrar a URL: `https://idols-drill.vercel.app`

---

#### **Opção B: Via Vercel CLI (Terminal)**

```bash
# 1. Navegar para o projeto
cd /c/projetos/4idol/designapp

# 2. Login na Vercel
vercel login

# Escolha método de login (GitHub, Email, etc)

# 3. Deploy inicial (desenvolvimento)
vercel

# Responda:
# - Set up and deploy? YES
# - Which scope? (escolha seu usuário/time)
# - Link to existing project? NO
# - What's your project's name? idols-drill
# - In which directory is your code located? ./ (apenas Enter)
# - Want to override settings? NO

# 4. Adicionar variável de ambiente
vercel env add GROQ_API_KEY

# Cole sua chave Groq quando solicitado
# Escolha: Production, Preview, Development (todas)

# 5. Deploy para produção
vercel --prod
```

---

### **4️⃣ Verificar Deploy**

Acesse a URL fornecida pela Vercel e teste:

- [ ] ✅ Página inicial carrega
- [ ] ✅ Seletor de idioma funciona
- [ ] ✅ Seletor de tom funciona
- [ ] ✅ Botão "Começar Exercício" funciona
- [ ] ✅ Chat carrega (teste enviar uma mensagem)
- [ ] ✅ Slider aparece ao eliminar ídolo
- [ ] ✅ Último ídolo é bloqueado
- [ ] ✅ Página de resultado exibe
- [ ] ✅ Mobile responsivo (teste no celular)

---

### **5️⃣ Configurar Custom Domain (Opcional)**

No painel da Vercel:
1. Vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `idolsdrill.com`)
4. Siga instruções para configurar DNS

---

## 🔧 Comandos Úteis

### Git
```bash
# Ver status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "descrição da mudança"

# Push
git push origin main

# Ver log
git log --oneline

# Ver diff
git diff
```

### Vercel
```bash
# Deploy preview
vercel

# Deploy produção
vercel --prod

# Ver logs
vercel logs

# Listar projetos
vercel ls

# Ver variáveis de ambiente
vercel env ls

# Remover deploy
vercel remove idols-drill
```

---

## ⚠️ Troubleshooting

### **Erro: Build failed**
- Verifique se `GROQ_API_KEY` está configurada
- Verifique logs no painel da Vercel
- Tente rodar `npm run build` localmente

### **Erro: Cannot find module**
- Rode `npm install` localmente
- Commit `package-lock.json`
- Push novamente

### **Erro: API não responde**
- Verifique se `GROQ_API_KEY` está correta
- Teste a chave em https://console.groq.com
- Verifique logs da API: `vercel logs`

### **Erro: Git push rejected**
- Configure Git:
  ```bash
  git config --global user.name "Seu Nome"
  git config --global user.email "seu@email.com"
  ```

---

## 📊 Monitoramento

### Vercel Analytics (Grátis)
1. Vá em **Analytics** no painel
2. Ative **Web Analytics**
3. Veja métricas de visitantes, performance, etc.

### Speed Insights
1. Vá em **Speed Insights** no painel
2. Veja Core Web Vitals (LCP, FID, CLS)

---

## 🎯 Próximos Passos

- [ ] Adicionar domínio personalizado
- [ ] Configurar analytics
- [ ] Testar em múltiplos dispositivos
- [ ] Coletar feedback de usuários
- [ ] Iterar baseado em feedback

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Groq Docs**: https://console.groq.com/docs

---

**Boa sorte com o deploy! 🚀**
