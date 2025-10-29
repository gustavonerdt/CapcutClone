# 📦 Instruções de Deploy - Naiper's Club no Hostinger

## 🎯 Guia Completo de Instalação

### Pré-requisitos
- Conta no Hostinger com plano que suporte PHP + MySQL
- Acesso ao cPanel/hPanel
- Cliente FTP ou File Manager do cPanel

---

## 📋 PASSO 1: Criar Banco de Dados MySQL

1. **Acesse o cPanel/hPanel do Hostinger**
2. **Vá em "MySQL Databases" ou "Bancos de Dados MySQL"**
3. **Crie um novo banco de dados:**
   - Nome: `naipers_club` (ou outro nome de sua preferência)
   - Anote o nome completo (geralmente fica: `usuario_naipers_club`)

4. **Crie um usuário MySQL:**
   - Usuário: `naipers_user` (ou outro nome)
   - Senha: Crie uma senha forte e anote
   - Anote o nome completo do usuário

5. **Adicione o usuário ao banco de dados:**
   - Selecione o usuário e o banco criados
   - Marque "ALL PRIVILEGES" (todos os privilégios)
   - Clique em "Add"

6. **Importe o schema do banco:**
   - Vá em "phpMyAdmin"
   - Selecione seu banco de dados
   - Clique na aba "Import" (Importar)
   - Escolha o arquivo `schema_mysql.sql`
   - Clique em "Go" (Executar)
   - ✅ Você verá as 3 tabelas criadas: sessions, tracking_events, quiz_responses

---

## 📋 PASSO 2: Configurar Credenciais do Banco

1. **Abra o arquivo `config/database.php`**
2. **Edite as seguintes linhas com suas credenciais:**

```php
define('DB_HOST', 'localhost');  // Geralmente é 'localhost'
define('DB_NAME', 'usuario_naipers_club');  // Seu nome completo do banco
define('DB_USER', 'usuario_naipers_user');  // Seu nome completo do usuário
define('DB_PASS', 'SUA_SENHA_AQUI');  // Sua senha do banco de dados
```

3. **Configure suas credenciais de admin:**

```php
define('ADMIN_USERNAME', 'admin');  // Altere se quiser outro username
define('ADMIN_PASSWORD', password_hash('SUA_SENHA_SEGURA', PASSWORD_BCRYPT));
```

**⚠️ IMPORTANTE: Troque 'SUA_SENHA_SEGURA' por uma senha forte!**

---

## 📋 PASSO 3: Upload dos Arquivos

### Opção A: Via File Manager (Mais Fácil)

1. **Acesse o File Manager no cPanel**
2. **Vá para a pasta `public_html`**
3. **Faça upload do arquivo ZIP:**
   - Clique em "Upload"
   - Selecione o arquivo `naipers-club-hostinger.zip`
   - Aguarde o upload completar

4. **Extraia o arquivo:**
   - Clique com botão direito no arquivo ZIP
   - Selecione "Extract" (Extrair)
   - Aguarde a extração

5. **Organize os arquivos:**
   - Mova todo o conteúdo da pasta `public/` para `public_html/`
   - Certifique-se que as pastas `api/`, `config/`, `includes/` estão em `public_html/`

### Opção B: Via FTP (FileZilla, etc)

1. **Configure seu cliente FTP:**
   - Host: Seu domínio ou IP do Hostinger
   - Usuário: Seu usuário FTP
   - Senha: Sua senha FTP
   - Porta: 21

2. **Conecte e navegue até `/public_html`**
3. **Faça upload de TODOS os arquivos extraídos**

---

## 📋 PASSO 4: Configurar Permissões

1. **No File Manager, selecione a pasta `config/`**
2. **Clique em "Permissions" (Permissões)**
3. **Defina para 644 (somente leitura para outros)**

⚠️ **Importante:** O arquivo `config/database.php` não deve ser acessível via web!

---

## 📋 PASSO 5: Testar a Instalação

### 5.1 Testar o Frontend

1. **Acesse seu domínio:** `https://seudominio.com`
2. **Você deve ver:**
   - ✅ Hero section do Naiper's Club
   - ✅ Logo dourado
   - ✅ Botão "Sim, com certeza!"

### 5.2 Testar o Quiz

1. **Clique no botão para iniciar o quiz**
2. **Responda as 5 perguntas**
3. **Preencha o formulário com seus dados**
4. **Clique em "Garantir Minha Vaga"**
5. **Você deve ver a página de sucesso**

### 5.3 Testar o Admin

1. **Acesse:** `https://seudominio.com/admin`
2. **Faça login com:**
   - Username: `admin` (ou o que você definiu)
   - Password: Sua senha definida no config
3. **Você deve ver:**
   - ✅ Dashboard com métricas
   - ✅ Gráfico de funil de conversão
   - ✅ Tabela de leads recentes

---

## 🔒 Segurança Pós-Deploy

### Importante! Execute estas ações:

1. **Ativar HTTPS:**
   - No cPanel, vá em "SSL/TLS Status"
   - Ative SSL para seu domínio
   - No arquivo `.htaccess`, descomente as linhas de forçar HTTPS

2. **Alterar senha de admin:**
   - Edite `config/database.php`
   - Altere a senha padrão `naipersadmin2024`

3. **Backup do banco de dados:**
   - Configure backups automáticos no cPanel
   - Ou exporte manualmente via phpMyAdmin

4. **Monitorar logs:**
   - Ative error_log no PHP
   - Monitore acessos suspeitos

---

## 📊 Estrutura de Arquivos no Hostinger

```
public_html/
├── index.html              # Frontend React (SPA)
├── .htaccess               # Configuração Apache
├── assets/                 # CSS, JS, imagens do React
├── api/                    # Endpoints PHP
│   ├── analytics.php
│   ├── auth-check.php
│   ├── auth-login.php
│   ├── auth-logout.php
│   ├── quiz-responses.php
│   ├── sessions.php
│   ├── sessions-update.php
│   └── tracking.php
├── config/                 # Configuração do banco
│   └── database.php        # ⚠️ Protegido pelo .htaccess
└── includes/               # Funções auxiliares
    └── auth.php            # ⚠️ Protegido pelo .htaccess
```

---

## 🐛 Troubleshooting (Resolução de Problemas)

### Problema: "Database connection failed"
**Solução:**
- Verifique as credenciais em `config/database.php`
- Confirme que o banco de dados existe no phpMyAdmin
- Teste a conexão MySQL no cPanel

### Problema: Página em branco
**Solução:**
- Ative error reporting no PHP
- Verifique os logs de erro do PHP no cPanel
- Confirme que o `.htaccess` está configurado corretamente

### Problema: "404 Not Found" nas rotas
**Solução:**
- Verifique se o arquivo `.htaccess` está em `public_html/`
- Confirme que mod_rewrite está habilitado (geralmente já vem)
- Teste acessando diretamente: `/api/sessions.php`

### Problema: Admin não faz login
**Solução:**
- Verifique se a senha foi gerada corretamente no `config/database.php`
- Use `password_hash('sua_senha', PASSWORD_BCRYPT)`
- Limpe cookies e sessões do navegador

### Problema: Tracking não funciona
**Solução:**
- Verifique se as tabelas foram criadas no MySQL
- Confirme que `sessions.php` retorna um `sessionId`
- Verifique o console do navegador para erros

---

## 📞 Suporte

Se você encontrar problemas:

1. **Verifique os logs do PHP** no cPanel
2. **Inspecione o console do navegador** (F12)
3. **Teste os endpoints diretamente:**
   - `https://seudominio.com/api/sessions.php` (POST)
   - `https://seudominio.com/api/auth-check.php` (GET)

---

## ✅ Checklist Final

- [ ] Banco de dados MySQL criado
- [ ] Schema importado (3 tabelas)
- [ ] Arquivo `config/database.php` configurado com credenciais corretas
- [ ] Senha de admin alterada
- [ ] Todos os arquivos enviados para `public_html/`
- [ ] Arquivo `.htaccess` presente na raiz
- [ ] Frontend carrega corretamente
- [ ] Quiz funciona e salva respostas
- [ ] Admin dashboard acessível e funcional
- [ ] HTTPS ativado
- [ ] Backups configurados

---

## 🎉 Pronto!

Sua aplicação Naiper's Club está rodando no Hostinger!

**URLs importantes:**
- **Site:** https://seudominio.com
- **Admin:** https://seudominio.com/admin
- **phpMyAdmin:** Acesso via cPanel

**Boas vendas! 💰🎯**
