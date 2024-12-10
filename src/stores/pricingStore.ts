export interface PricingPlan {
  name: string;
  price: string;
  receipts: number;
  features: string[];
}

export const defaultPlans: Record<string, PricingPlan> = {
  start: {
    name: "Start",
    price: "29,90",
    receipts: 10,
    features: [
      "Até 10 recibos por mês",
      "Modelos básicos",
      "Suporte por email",
      "Assinatura digital"
    ]
  },
  gold: {
    name: "Ouro",
    price: "79,90",
    receipts: 50,
    features: [
      "Até 50 recibos por mês",
      "Todos os modelos",
      "Suporte prioritário",
      "Assinatura digital",
      "Logo personalizada",
      "Dados da empresa"
    ]
  },
  supergold: {
    name: "Super Ouro",
    price: "199,90",
    receipts: 500,
    features: [
      "Até 500 recibos por mês",
      "Todos os recursos",
      "Suporte VIP 24/7",
      "Assinatura digital",
      "Logo personalizada",
      "Dados da empresa",
      "API de integração",
      "Múltiplos usuários"
    ]
  }
};