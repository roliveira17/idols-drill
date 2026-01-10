# ⚡ Deploy Rápido - 3 Passos

## 🎯 Pré-requisito
- Ter conta no GitHub
- Ter chave da API Groq ([console.groq.com/keys](https://console.groq.com/keys))

---

## 1️⃣ Criar Repositório no GitHub (2 minutos)

1. Acesse: **https://github.com/new**
2. Nome: `idols-drill`
3. **NÃO** marque "Add README"
4. Clique em **"Create repository"**
5. **Copie** a URL que aparece (ex: `https://github.com/SEU-USUARIO/idols-drill.git`)

---

## 2️⃣ Conectar e Push (1 comando)

Abra o terminal e execute:

```bash
cd /c/projetos/4idol/designapp
git remote add origin https://github.com/SEU-USUARIO/idols-drill.git
git push -u origin main
```

> ⚠️ **Substitua** `SEU-USUARIO` pelo seu usuário do GitHub

Se pedir senha: use um **Personal Access Token**
- Criar em: https://github.com/settings/tokens
- Scope: marque `repo`

---

## 3️⃣ Deploy na Vercel (3 minutos)

### Via Interface Web (Recomendado):

1. **https://vercel.com/login** (pode usar conta GitHub)
2. Clique em **"Add New..."** → **"Project"**
3. Selecione **`idols-drill`**
4. Em **"Environment Variables"** adicione:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_sua_chave`
   - Environments: **Marque todas**
5. Clique em **"Deploy"**
6. ✅ Pronto! URL: `https://idols-drill.vercel.app`

### Via Terminal (Alternativa):

```bash
vercel login
vercel
vercel env add GROQ_API_KEY
# Cole sua chave quando pedir
vercel --prod
```

---

## ✅ Checklist de Teste

Acesse a URL da Vercel e teste:

- [ ] Página inicial abre
- [ ] Consegue mudar idioma
- [ ] Consegue enviar mensagem no chat
- [ ] Slider aparece ao eliminar ídolo
- [ ] Resultado exibe no final

---

## 🆘 Problemas?

**Build falhou?**
→ Verifique se adicionou `GROQ_API_KEY`

**Chat não responde?**
→ Teste sua chave em: https://console.groq.com

**Não consegue fazer push?**
→ Use Personal Access Token ao invés de senha

---

**🎉 Só isso! Projeto no ar em ~6 minutos**

Documentação completa: [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md)
