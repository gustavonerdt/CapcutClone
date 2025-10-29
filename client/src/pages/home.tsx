import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { QuizFormData, InsertQuizResponse } from "@shared/schema";
import { quizFormSchema } from "@shared/schema";
import { Sparkles, CheckCircle2, ArrowRight, Play, ShoppingCart, TrendingUp, Award, Users, Star } from "lucide-react";
import heroImage from "@assets/generated_images/Video_creator_hero_image_1da409f3.png";
import logoImage from "@assets/LOGOTIPO_NAIPERS_CLUB (1)_1761695015269.png";
import { quizQuestions, benefits, finalOfferBenefits, checkoutUrl, heroBenefits } from "@/data/quiz-questions";
import { useTracking } from "@/hooks/use-tracking";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"hero" | "quiz" | "form" | "success">("hero");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { trackEvent, updateSession, sessionId } = useTracking();

  // Track page views
  useEffect(() => {
    if (currentStep === "hero") {
      trackEvent("page_view", 0);
    } else if (currentStep === "quiz") {
      trackEvent("page_view", quizStep + 1);
    } else if (currentStep === "form") {
      trackEvent("page_view", 6);
    } else if (currentStep === "success") {
      trackEvent("page_view", 7);
      updateSession({ completedQuiz: 1 });
    }
  }, [currentStep, quizStep]);

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      answer1: "",
      answer2: "",
      answer3: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: QuizFormData) => {
      trackEvent("form_submit", 6);
      const payload: InsertQuizResponse = { ...data, sessionId };
      return await apiRequest("POST", "/api/quiz-responses", payload);
    },
    onSuccess: () => {
      setCurrentStep("success");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
      });
    },
  });

  const handleAnswer = (questionId: number, answerId: string) => {
    const answerKey = `answer${questionId}` as "answer1" | "answer2" | "answer3";
    setAnswers({ ...answers, [answerKey]: answerId });
    form.setValue(answerKey, answerId);
    
    // Track answer click
    trackEvent("answer_click", quizStep + 1, answerId);
    
    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    } else {
      setTimeout(() => setCurrentStep("form"), 300);
    }
  };

  const handleSubmit = (data: QuizFormData) => {
    submitMutation.mutate(data);
  };

  const handleBuyClick = () => {
    trackEvent("buy_click", currentStep === "form" ? 6 : 7);
    updateSession({ clickedBuy: 1 });
    window.open(checkoutUrl, '_blank');
  };

  const progress = currentStep === "quiz" ? ((quizStep + 1) / quizQuestions.length) * 100 : 0;
  const currentQuestion = quizQuestions[quizStep];

  return (
    <div className="min-h-screen bg-background">
      {currentStep === "quiz" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b">
          <div className="h-1 bg-muted">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-pink-500 to-purple-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="max-w-2xl mx-auto px-4 py-3">
            <p className="text-sm font-medium text-muted-foreground text-center">
              Pergunta {quizStep + 1} de {quizQuestions.length}
            </p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-8"
              >
                <img src={logoImage} alt="Naiper's Club" className="h-24 md:h-32 w-auto" data-testid="logo-naipers" />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Star className="w-4 h-4 text-[#1E90FF] fill-[#1E90FF]" />
                <span className="text-sm font-medium text-white">Mais de 10.000 membros já economizando até 70%</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
              >
                Me responda uma coisa...
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-white/95 leading-relaxed max-w-3xl mx-auto"
              >
                Você gostaria de <span className="font-bold text-[#FFD700]">economizar até 70%</span> na compra de perfumes importados originais para o seu uso próprio, ter{" "}
                <span className="font-bold text-[#FFD700]">acesso facilitado</span> as fontes dos donos de lojas de shopping e descobrir um jeito simples de ainda fazer{" "}
                <span className="font-bold text-[#FFD700]">Renda extra</span>?
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
              >
                <Button
                  size="lg"
                  onClick={() => setCurrentStep("quiz")}
                  className="px-12 py-6 text-lg font-semibold rounded-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 hover:shadow-2xl hover:shadow-[#FFD700]/50 hover:scale-105 transition-all duration-300"
                  data-testid="button-start-quiz"
                >
                  <Star className="w-5 h-5 mr-2 text-[#1E90FF] fill-[#1E90FF]" />
                  Sim, com certeza!
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-3xl mx-auto"
              >
                {heroBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center space-y-2"
                  >
                    <div className="text-3xl">{benefit.icon}</div>
                    <h3 className="font-bold text-[#FFD700] text-lg">{benefit.title}</h3>
                    <p className="text-white/80 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div
            key={`quiz-${quizStep}`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="min-h-screen flex items-center justify-center px-4 pt-24 pb-16"
          >
            <div className="max-w-2xl w-full space-y-8">
              {currentQuestion.type === "benefits" && (
                <div className="space-y-6 mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-card border"
                      >
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion.type === "progress" && (
                <div className="space-y-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-4 p-8 rounded-xl bg-card border-2 border-primary/20">
                    <div className="relative w-full h-6 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-4xl font-bold text-primary">Alta!</p>
                      <p className="text-lg text-foreground">
                        Você está literalmente pronto(a) para dar o próximo passo e se tornar um consumidor inteligente e destravar mais uma fonte de renda.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.type === "testimonials" && (
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-4 p-6 rounded-xl bg-card border">
                    <p className="text-base text-muted-foreground italic text-center">
                      "Estou economizando muito com o Naiper's Club! Já consegui fazer minha primeira venda também." - Maria S.
                    </p>
                    <p className="text-base text-muted-foreground italic text-center">
                      "Incrível! Nunca imaginei que seria tão fácil ter acesso a perfumes importados com esses preços." - João P.
                    </p>
                    <p className="text-base text-muted-foreground italic text-center">
                      "Melhor investimento que fiz. Já recuperei o valor da assinatura só com as economias!" - Ana L.
                    </p>
                  </div>
                </div>
              )}

              {!currentQuestion.type || currentQuestion.type === "standard" ? (
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
                  {currentQuestion.question}
                </h2>
              ) : null}

              <div className="space-y-4">
                {currentQuestion.answers.map((answer, index) => (
                  <motion.button
                    key={answer.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    onClick={() => handleAnswer(currentQuestion.id, answer.id)}
                    className="w-full p-6 rounded-xl border-2 border-border bg-card hover-elevate active-elevate-2 transition-all text-left group"
                    data-testid={`button-answer-${answer.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-lg font-medium text-foreground flex-1">{answer.text}</span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <div className="max-w-4xl w-full space-y-8">
              <div className="text-center space-y-4">
                <img src={logoImage} alt="Naiper's Club" className="h-20 w-auto mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Antes / Depois
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl border-2 border-destructive/30 bg-destructive/5 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Antes</h3>
                  <div className="space-y-2">
                    <p className="text-base text-muted-foreground">❌ Comprando errado e perdendo dinheiro</p>
                    <p className="text-base text-muted-foreground">❌ Sem vender por falta de conhecimento</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl border-2 border-primary/30 bg-primary/5 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Depois</h3>
                  <div className="space-y-2">
                    <p className="text-base text-foreground">✅ Comprando certo - Economizando até 70%</p>
                    <p className="text-base text-foreground">✅ Lucrando de R$ 150 à 400 por venda feita</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-xl p-8 space-y-6">
                <div className="space-y-3">
                  {finalOfferBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-4 pt-4">
                  <p className="text-lg font-bold text-foreground">
                    Naiper's Club - o seu novo jeito de viver, consumir e lucrar com perfumes importados!
                  </p>
                  <Button
                    size="lg"
                    onClick={handleBuyClick}
                    className="w-full py-8 text-xl font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-2xl hover:scale-105 transition-all"
                    data-testid="button-buy-now"
                  >
                    <ShoppingCart className="w-6 h-6 mr-2" />
                    Comprar agora por 12x R$ 20,37
                  </Button>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>🎁 Acesso imediato</span>
                    <span>💥 De R$ 297 Por 197</span>
                    <span>📲 Experiencie direto do seu celular</span>
                    <span>🚀 Comece hoje a economizar e lucrar</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Ou preencha seus dados para receber mais informações:</p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 max-w-md mx-auto">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Nome completo</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Seu nome" className="h-12 text-base" data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">E-mail</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="seu@email.com" className="h-12 text-base" data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">WhatsApp</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value ?? ""} type="tel" placeholder="(00) 00000-0000" className="h-12 text-base" data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitMutation.isPending}
                      className="w-full py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-600"
                      data-testid="button-submit-form"
                    >
                      {submitMutation.isPending ? "Enviando..." : "Receber Mais Informações"}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex items-center justify-center px-4 py-16"
          >
            <div className="max-w-lg w-full text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-4"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Tudo certo, {form.getValues("name").split(" ")[0]}! 🎉
              </h2>

              <p className="text-lg text-muted-foreground">
                Enviamos as informações para <span className="font-semibold text-foreground">{form.getValues("email")}</span>
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-xl p-6 space-y-4">
                <p className="text-base text-foreground"><strong>Não perca essa oportunidade!</strong></p>
                <Button
                  size="lg"
                  onClick={handleBuyClick}
                  className="w-full py-6 text-lg font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl"
                  data-testid="button-buy-success"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Garantir Minha Vaga Agora
                </Button>
              </div>

              <Button
                size="lg"
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-8 py-6 rounded-full"
                data-testid="button-restart"
              >
                Refazer o Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
