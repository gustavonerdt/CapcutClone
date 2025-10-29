# 🌟 Naiper's Club - Funil de Vendas de Perfumes

> Quiz interativo otimizado para Instagram com botões amarelos vibrantes e design mobile-first

![Status](https://img.shields.io/badge/status-pronto%20para%20deploy-success)
![Versão](https://img.shields.io/badge/versão-1.0-blue)

---

## 📦 O que está incluído

Este repositório contém **todos os arquivos compilados e prontos** para fazer upload direto na sua hospedagem (Hostinger, cPanel, etc).

✅ **Todos os botões amarelos dourados** (#FFD700 → #FFB700)  
✅ **Carrossel com 6 feedbacks de clientes** (Pergunta 4)  
✅ **Seção Antes/Depois** na página final  
✅ **Admin simplificado** - apenas username "Bruno" (sem senha)  
✅ **Design mobile-first** otimizado para Instagram  
✅ **Fundo preto puro** (#000) com acentos dourados/azuis  

---

## 🚀 Como usar (3 passos)

### 1️⃣ **Baixe os arquivos**
```bash
# Clone ou baixe este repositório
git clone https://github.com/seu-usuario/naipers-club-pronto.git
```

### 2️⃣ **Faça upload na hospedagem**
- Acesse seu painel de hospedagem (cPanel/Hostinger)
- Entre na pasta `public_html/`
- **DELETE todos os arquivos existentes**
- Faça upload de **TODOS os arquivos** desta pasta
- Mantenha a estrutura de pastas intacta

### 3️⃣ **Limpe o cache e teste**
- Abra o navegador
- Pressione `Ctrl + Shift + R` (force refresh)
- Acesse seu domínio
- Pronto! ✨

---

## 📁 Estrutura de arquivos

```
naipers-club-pronto/
│
├── index.html              ← Página principal (3MB compilado)
├── favicon.png             ← Ícone do site
│
└── assets/                 ← Pasta de recursos
    ├── index-[hash].css    ← CSS compilado (82KB)
    ├── index-[hash].js     ← JavaScript compilado
    │
    └── [6 imagens].jpg     ← Feedbacks de clientes
        ├── feedback1.jpg
        ├── feedback2.jpg
        ├── feedback3.jpg
        ├── feedback4.jpg
        ├── feedback5.jpg
        └── feedback6.jpg
```

---

## 🎨 Design & Features

### Cores principais
- **Fundo**: Preto puro (#000000)
- **Botões**: Gradiente dourado (#FFD700 → #FFB700)
- **Texto**: Branco (#FFFFFF)
- **Acentos**: Azul (#1E90FF)

### Botões principais
Todos os botões CTA usam o mesmo estilo vibrante:
```css
background: linear-gradient(to right, #FFD700, #FFB700);
border: 4px solid rgba(255, 215, 0, 0.5);
box-shadow: 0 25px 50px rgba(255, 215, 0, 0.6);
```

### Responsividade
- ✅ Mobile (320px - 768px)
- ✅ Tablet (768px - 1024px)
- ✅ Desktop (1024px+)

---

## 🔐 Acesso Admin

### URL: `/admin`

**Credenciais:**
```
Usuário: Bruno
Senha: (não precisa - só aperte Enter)
```

### O que o admin mostra:
- 📊 Total de sessões/visitantes
- 👁️ Total de visualizações
- 📝 Formulários submetidos (leads)
- 🛒 Cliques no botão "Comprar"
- 📈 Funil de conversão visual
- 📋 Tabela de leads recentes

---

## 🛠️ Tecnologias usadas

- **Frontend**: React + TypeScript
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion

---

## 📱 Otimizações

### Performance
- ✅ CSS minificado (82KB)
- ✅ JavaScript tree-shaking
- ✅ Imagens otimizadas
- ✅ Lazy loading

### SEO
- ✅ Meta tags otimizadas
- ✅ Open Graph tags
- ✅ Títulos descritivos
- ✅ Alt text em imagens

### Mobile
- ✅ Tipografia responsiva
- ✅ Botões com min 44px (acessibilidade)
- ✅ Toque otimizado
- ✅ Sem zoom horizontal

---

## 🎯 Fluxo do usuário

```
1. Hero Section
   └─> Botão: "Sim, com certeza!"
       │
2. Pergunta 1: Tipo de fragrância
       │
3. Pergunta 2: Duração
       │
4. Pergunta 3: Ocasião
       │
5. Pergunta 4: Carrossel (6 feedbacks)
       │
6. Pergunta 5: Faixa de preço
       │
7. Formulário (Nome, Email, Telefone)
       │
8. Página Final
   ├─> Seção "Veja a Transformação"
   ├─> 2x Botões "COMPRAR AGORA"
   └─> Link para WhatsApp: https://wa.me/5511999999999
```

---

## 🔗 Links importantes

- **Checkout**: https://ticto.app/p/naipersclub
- **WhatsApp**: https://wa.me/5511999999999
- **Admin**: /admin

---

## ⚙️ Configuração (opcional)

### Mudar cores dos botões
Edite o arquivo `assets/index-[hash].css` e procure por:
```css
from-[#FFD700] to-[#FFB700]
```
Substitua pelas cores desejadas.

### Mudar número do WhatsApp
Edite `index.html` e procure por:
```html
https://wa.me/5511999999999
```

### Mudar link de checkout
Edite `index.html` e procure por:
```html
https://ticto.app/p/naipersclub
```

---

## 📞 Suporte

Caso tenha problemas:

1. **Limpe o cache**: `Ctrl + Shift + R`
2. **Teste em modo anônimo**: `Ctrl + Shift + N`
3. **Verifique a estrutura**: Certifique-se que a pasta `assets/` foi copiada
4. **Verifique permissões**: Arquivos devem ter permissão 644, pastas 755

---

## 📄 Licença

© 2025 Naiper's Club. Todos os direitos reservados.

---

## ✨ Feito com

Desenvolvido com ❤️ usando React, TypeScript e muita dedicação!

**Pronto para vender! 🚀**
