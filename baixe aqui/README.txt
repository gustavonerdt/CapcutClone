╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║           🎉 NAIPER'S CLUB - SISTEMA COMPLETO HOSTINGER         ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

📦 PASTA ÚNICA COM TODO O SISTEMA ORGANIZADO

Esta pasta contém TUDO que você precisa para rodar no Hostinger!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 ESTRUTURA DA PASTA:

naipers-club-final/
│
├── 🌐 ÁREA DO USUÁRIO (Quiz Funnel)
│   ├── index.html .................. Página principal do quiz
│   ├── assets/ ..................... CSS, JS, imagens
│   └── favicon.png ................. Ícone do site
│
├── 🔐 ÁREA ADMIN (Dashboard)
│   └── admin/
│       └── index.html .............. Dashboard de analytics
│
├── 🔧 BACKEND (API PHP)
│   └── api/
│       ├── sessions.php ............ Criar sessão
│       ├── sessions-id.php ......... Atualizar sessão
│       ├── tracking.php ............ Tracking de eventos
│       ├── quiz-responses.php ...... Respostas do quiz
│       ├── analytics.php ........... Dashboard (protegido)
│       └── auth/
│           ├── login.php ........... Login admin
│           ├── logout.php .......... Logout admin
│           └── status.php .......... Status auth
│
├── ⚙️ CONFIGURAÇÃO
│   ├── config/
│   │   └── database.php ............ 🔴 EDITE AQUI!
│   └── includes/
│       └── auth.php ................ Funções de autenticação
│
├── 📄 ARQUIVOS IMPORTANTES
│   ├── .htaccess ................... Routing e segurança
│   └── schema_mysql.sql ............ Banco de dados
│
└── 📚 DOCUMENTAÇÃO
    └── docs/
        ├── INSTALACAO.txt .......... Como instalar
        ├── ESTRUTURA.txt ........... Guia da estrutura
        └── CREDENCIAIS.txt ......... Onde configurar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 INSTALAÇÃO RÁPIDA (5 MINUTOS):

1. 📤 UPLOAD
   - Envie TODA esta pasta para: public_html/
   - Ou crie uma subpasta: public_html/naipers/

2. 💾 BANCO DE DADOS
   - phpMyAdmin → Import → schema_mysql.sql
   - Anote: nome do banco, usuário, senha

3. ⚙️ CONFIGURAR
   - Edite: config/database.php
   - Preencha suas credenciais MySQL
   - Troque a senha de admin!

4. ✅ TESTAR
   - https://seudominio.com (Quiz do usuário)
   - https://seudominio.com/admin (Dashboard admin)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 ACESSOS:

┌─────────────────────────────────────────────────────────────────┐
│ 👥 ÁREA DO USUÁRIO (Quiz Funnel)                               │
├─────────────────────────────────────────────────────────────────┤
│ URL: https://seudominio.com                                     │
│                                                                 │
│ ✅ Quiz com 5 perguntas                                        │
│ ✅ Formulário de captura de leads                              │
│ ✅ Página de sucesso com botão de compra                       │
│ ✅ Tracking automático de eventos                              │
│ ✅ Design preto com dourado/azul                               │
│ ✅ Totalmente responsivo                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 🔐 ÁREA ADMIN (Dashboard Analytics)                            │
├─────────────────────────────────────────────────────────────────┤
│ URL: https://seudominio.com/admin                               │
│                                                                 │
│ 👤 Usuário: admin                                              │
│ 🔑 Senha: naipersadmin2024 (TROQUE NO config/database.php!)   │
│                                                                 │
│ 📊 Métricas em tempo real:                                     │
│    • Total de visitantes/sessões                               │
│    • Total de visualizações de página                          │
│    • Leads capturados                                          │
│    • Cliques no botão "Comprar"                                │
│    • Funil de conversão visual                                 │
│    • Distribuição de respostas                                 │
│    • Tabela de leads recentes                                  │
│    • Análise de exit points                                    │
└─────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANTE - CONFIGURAR ANTES DE USAR:

1. 🔴 EDITAR: config/database.php
   
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'seu_usuario_naipers_club');
   define('DB_USER', 'seu_usuario_mysql');
   define('DB_PASS', 'sua_senha_mysql');
   
   // 🔑 TROCAR SENHA DE ADMIN!
   define('ADMIN_USERNAME', 'admin');
   define('ADMIN_PASSWORD', password_hash('SUA_SENHA_SEGURA', PASSWORD_BCRYPT));

2. 🔒 ATIVAR HTTPS (Produção)
   
   No arquivo .htaccess, descomente as linhas:
   
   # RewriteCond %{HTTPS} off
   # RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎨 DESIGN IMPLEMENTADO:

✅ Background preto em todas as telas
✅ Cores vibrantes (dourado #FFD700, azul #1E90FF)
✅ Textos brancos com alto contraste
✅ Gradientes modernos
✅ Animações suaves
✅ Responsivo mobile/tablet/desktop
✅ Otimizado para Instagram traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 BANCO DE DADOS (3 Tabelas):

• sessions ...................... Sessões de visitantes
• tracking_events ............... Eventos de tracking
• quiz_responses ................ Respostas e leads

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🛠️ TECNOLOGIAS:

Frontend:
• React 18 (compilado)
• Vite (build otimizado)
• Tailwind CSS + Shadcn/UI
• Framer Motion (animações)

Backend:
• PHP 7.4+
• MySQL 5.7+
• Session management
• Bcrypt password hashing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 PRECISA DE AJUDA?

Leia os arquivos em docs/:
• INSTALACAO.txt - Passo a passo completo
• ESTRUTURA.txt - Como tudo funciona
• CREDENCIAIS.txt - Onde configurar senhas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ TUDO ESTÁ PRONTO!

Esta pasta contém o sistema COMPLETO e FUNCIONAL.
Basta fazer upload, configurar o banco e está no ar!

💰 Boas vendas! ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
