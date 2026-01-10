#!/bin/bash

# Script de Deploy Automatizado - Idol's Drill
# Execute: ./deploy.sh

set -e  # Exit on error

echo "🚀 Iniciando processo de deploy..."
echo ""

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto (designapp/)"
    exit 1
fi

# 1. Verificar se há mudanças não commitadas
echo "📝 Verificando mudanças..."
if [[ -n $(git status -s) ]]; then
    echo "⚠️  Há mudanças não commitadas. Deseja commitar agora? (y/n)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        git add .
        echo "Digite a mensagem do commit:"
        read -r commit_msg
        git commit -m "$commit_msg"
        echo "✅ Commit realizado"
    else
        echo "❌ Deploy cancelado. Commit as mudanças primeiro."
        exit 1
    fi
else
    echo "✅ Nenhuma mudança pendente"
fi

# 2. Verificar se remote origin existe
echo ""
echo "🔗 Verificando remote do GitHub..."
if ! git remote get-url origin &> /dev/null; then
    echo "⚠️  Remote 'origin' não configurado."
    echo "Digite a URL do seu repositório GitHub:"
    echo "Exemplo: https://github.com/seu-usuario/idols-drill.git"
    read -r repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote adicionado"
else
    echo "✅ Remote configurado: $(git remote get-url origin)"
fi

# 3. Push para GitHub
echo ""
echo "📤 Fazendo push para GitHub..."
git push -u origin main
echo "✅ Código enviado para GitHub"

# 4. Deploy na Vercel
echo ""
echo "🚢 Fazendo deploy na Vercel..."
echo "Escolha o tipo de deploy:"
echo "1) Preview (desenvolvimento)"
echo "2) Production"
read -r deploy_type

if [ "$deploy_type" = "2" ]; then
    echo "🚀 Deploying para PRODUÇÃO..."
    vercel --prod
else
    echo "🔍 Deploying para PREVIEW..."
    vercel
fi

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📊 Próximos passos:"
echo "1. Verifique a URL fornecida pela Vercel"
echo "2. Teste todas as funcionalidades"
echo "3. Configure variável GROQ_API_KEY se ainda não fez"
echo ""
echo "🎉 Sucesso!"
