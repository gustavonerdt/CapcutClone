# Naiper's Club - Deploy Package para Hostinger

Este pacote contém todos os arquivos necessários para fazer deploy da aplicação Naiper's Club no Hostinger.

## 📦 Conteúdo do Pacote

- `schema_mysql.sql` - Schema do banco de dados MySQL
- `DEPLOY_INSTRUCTIONS.md` - Instruções completas de instalação
- `config/database.php` - Configuração da conexão com banco de dados
- `api/` - Endpoints PHP da API
- `includes/` - Funções auxiliares e autenticação
- `.htaccess` - Configuração Apache para SPA routing
- `public/` - Frontend React compilado (será gerado no build)

## 🚀 Início Rápido

1. Leia o arquivo `DEPLOY_INSTRUCTIONS.md`
2. Crie seu banco de dados MySQL no Hostinger
3. Importe o arquivo `schema_mysql.sql`
4. Configure as credenciais em `config/database.php`
5. Faça upload dos arquivos para `public_html/`
6. Acesse seu domínio e teste!

## 📋 Requisitos

- Hostinger com plano que suporte PHP 7.4+ e MySQL
- phpMyAdmin (incluído no cPanel)
- Domínio configurado

## 🔐 Segurança

**IMPORTANTE:** Antes de colocar em produção:

1. Altere a senha de admin em `config/database.php`
2. Ative HTTPS no seu domínio
3. Configure backups automáticos

## 📊 Funcionalidades

- ✅ Quiz funnel completo com 5 perguntas
- ✅ Captura de leads (nome, email, telefone)
- ✅ Tracking de eventos (page views, cliques, conversões)
- ✅ Dashboard administrativo com analytics
- ✅ Autenticação segura para admin
- ✅ Integração com link de checkout Ticto

## 📞 Suporte

Consulte o arquivo `DEPLOY_INSTRUCTIONS.md` para instruções detalhadas e troubleshooting.
