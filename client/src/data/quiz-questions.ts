import { QuizQuestion } from "@shared/schema";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "De quem você comprava perfumes importados até este momento?",
    type: "standard",
    answers: [
      { id: "sites-lojas-brasil", text: "🛒 Sites e lojas no Brasil" },
      { id: "paraguai", text: "🌎 Comprava do Paraguai" },
      { id: "conhecido", text: "👥 De um conhecido" },
    ],
  },
  {
    id: 2,
    question: "Você já cogitou revender perfumes importados e viver disso ou tá satisfeito como consumidor, mas tem interesse de comprar mais barato?",
    type: "standard",
    answers: [
      { id: "revender", text: "💼 Já cogitei revender perfumes importados" },
      { id: "economizar", text: "💰 Pretendo apenas economizar em minhas compras pessoais" },
    ],
  },
  {
    id: 3,
    question: "O Naipers Club vai te oferecer:",
    type: "benefits",
    answers: [
      { id: "parece-bom", text: "✨ Maravilha, parece ser muito bom!" },
      { id: "prova", text: "🤔 Me prova que vale a pena" },
    ],
  },
  {
    id: 4,
    question: "Veja o que os membros do Club estão falando do NAIPER'S CLUB",
    type: "testimonials",
    answers: [
      { id: "quero-reduzir", text: "🚀 Também quero reduzir meus custos e começar a ganhar dinheiro com isso!" },
      { id: "deixar-passar", text: "😕 Vou deixar passar essa chance…" },
    ],
  },
  {
    id: 5,
    question: "Com base nas suas respostas, sua chance de poupar muita grana em suas compras pessoais e lucrar com perfumes importados é:",
    type: "progress",
    answers: [
      { id: "avancar", text: "▶️ Avançar" },
    ],
  },
];

export const heroBenefits = [
  {
    icon: "💰",
    title: "70% de Economia",
    description: "Economize até 70% em perfumes importados originais"
  },
  {
    icon: "💸",
    title: "Renda Extra",
    description: "Jeito simples de fazer renda extra com perfumes"
  },
  {
    icon: "👥",
    title: "+10k Membros",
    description: "Mais de 10.000 membros já economizando"
  }
];

export const benefits = [
  "até 70% de economia",
  "possibilidade de fazer até R$ 1.000,00 de renda extra",
  "Cota de compra de 5 perfumes por mês sem exigência de pedido mínimo",
  "Acesso a área de membros com aulas caso pense em algum momento começar a revender",
];

export const finalOfferBenefits = [
  "Acesso imediato a área de membros, com aulas práticas e objetivas com orientações sobre como funciona o NAIPER'S CLUB.",
  "Acesso imediato a Comunidade no WhatsApp para ter acesso a ofertas diárias, liquidações e saldões exclusivos.",
  "Bônus extra 01: Acesso a Tríade da Fortuna, conteúdos diários no Telegram, treinamentos e conferências de vendas semanais para quem está cogitando transformar a oportunidade em um negócio.",
  "Bônus extra 02: Acesso ao 1EM7 para aprender a fazer R$ 1.000 reais por semana com perfumes importados.",
  "Bônus Extra 03: Script de atendimento via WhatsApp para vender para qualquer tipo de pessoa.",
  "Suporte diário + acesso a estoque com mais de 300 tipos de perfumes entre árabes, designers e perfumes de nicho a pronta entrega.",
  "Acesso a tabelas e Books promocionais das importadoras oficiais (A FONTE OFICIAL)",
  "Tudo isso com acesso por 12 meses.",
];

export const checkoutUrl = "https://payment.ticto.app/O9F6EC239";
