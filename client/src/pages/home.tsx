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
  const [currentStep, setCurrentStep] = useState<"hero" | "quiz" | "success">("hero");
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
    } else if (currentStep === "success") {
      trackEvent("page_view", 6);
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
    
    trackEvent("answer_click", quizStep + 1, answerId);
    
    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    } else {
      setTimeout(() => {
        updateSession({ completedQuiz: 1 });
        setCurrentStep("success");
      }, 300);
    }
  };

  const handleSubmit = (data: QuizFormData) => {
    submitMutation.mutate(data);
  };

  const handleBuyClick = () => {
    trackEvent("buy_click", 7);
    updateSession({ clickedBuy: 1 });
    window.open(checkoutUrl, '_blank');
  };

  const progress = currentStep === "quiz" ? ((quizStep + 1) / quizQuestions.length) * 100 : 0;
  const currentQuestion = quizQuestions[quizStep];

  return (
    <div className="min-h-screen bg-black">
      {currentStep === "quiz" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
          <div className="flex justify-center py-3 border-b border-white/5">
            <img 
              src={logoImage} 
              alt="Naiper's Club" 
              className="h-10 sm:h-12 w-auto" 
              data-testid="logo-quiz" 
            />
          </div>
          <div className="h-1.5 bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FFD700] via-[#1E90FF] to-[#FFD700]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
            <p className="text-sm font-medium text-white/70 text-center">
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
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center space-y-6 sm:space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex justify-center mb-4 sm:mb-6 lg:mb-8"
              >
                <img 
                  src={logoImage} 
                  alt="Naiper's Club" 
                  className="h-16 sm:h-20 md:h-24 lg:h-24 w-auto" 
                  data-testid="logo-naipers" 
                />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold italic text-white leading-tight px-4"
              >
                Me responda uma coisa...
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xs sm:text-sm md:text-base lg:text-base text-white/90 leading-relaxed max-w-3xl mx-auto px-4"
              >
                Você gostaria de <span className="font-bold text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">economizar até 70%</span> na compra de perfumes importados originais para o seu uso próprio, ter{" "}
                <span className="font-bold text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">acesso facilitado</span> as fontes dos donos de lojas de shopping e descobrir um jeito simples de ainda fazer{" "}
                <span className="font-bold text-[#FFD700] drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">Renda extra</span>?
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-4 sm:gap-6 pt-4 sm:pt-6"
              >
                <Button
                  size="lg"
                  onClick={() => setCurrentStep("quiz")}
                  className="px-8 sm:px-10 lg:px-12 py-5 sm:py-6 lg:py-6 text-base sm:text-lg lg:text-lg font-bold rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-black hover:shadow-2xl hover:shadow-[#FFD700]/50 hover:scale-105 transition-all duration-300 border-2 border-[#FFD700]/50"
                  data-testid="button-start-quiz"
                >
                  <Star className="w-5 h-5 sm:w-5 sm:h-5 mr-2 text-[#1E90FF] fill-[#1E90FF]" />
                  Sim, com certeza!
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 max-w-3xl mx-auto px-4"
              >
                {heroBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 sm:p-6 border border-white/20 text-center space-y-3 hover:border-[#FFD700]/50 hover:shadow-lg hover:shadow-[#FFD700]/20 transition-all duration-300"
                  >
                    <div className="text-3xl sm:text-4xl">{benefit.icon}</div>
                    <h3 className="font-bold text-[#FFD700] text-base sm:text-lg drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
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
            className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16 bg-black"
          >
            <div className="max-w-3xl w-full space-y-6 sm:space-y-8">
              {currentQuestion.type === "benefits" && (
                <div className="space-y-6 mb-8">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight px-4">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-white/5 to-white/10 border border-white/20 backdrop-blur-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700] flex-shrink-0 mt-0.5" />
                        <span className="text-base sm:text-lg text-white">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentQuestion.type === "progress" && (
                <div className="space-y-6 text-center px-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFD700]/10 to-[#1E90FF]/10 border-2 border-[#FFD700]/30 backdrop-blur-xl">
                    <div className="relative w-full h-8 bg-white/10 rounded-full overflow-hidden border border-white/20">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-400 via-[#FFD700] to-green-500"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <div className="space-y-3">
                      <p className="text-3xl sm:text-4xl font-bold text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
                        Alta!
                      </p>
                      <p className="text-sm sm:text-base text-white leading-relaxed">
                        Você está literalmente pronto(a) para dar o próximo passo e se tornar um consumidor inteligente e destravar mais uma fonte de renda.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.type === "testimonials" && (
                <div className="space-y-6 px-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight">
                    {currentQuestion.question}
                  </h2>
                  <div className="space-y-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 backdrop-blur-xl">
                    <p className="text-sm sm:text-base text-white/90 italic text-center leading-relaxed border-l-4 border-[#FFD700] pl-4">
                      "Estou economizando muito com o Naiper's Club! Já consegui fazer minha primeira venda também." - Maria S.
                    </p>
                    <p className="text-sm sm:text-base text-white/90 italic text-center leading-relaxed border-l-4 border-[#1E90FF] pl-4">
                      "Incrível! Nunca imaginei que seria tão fácil ter acesso a perfumes importados com esses preços." - João P.
                    </p>
                    <p className="text-sm sm:text-base text-white/90 italic text-center leading-relaxed border-l-4 border-[#FFD700] pl-4">
                      "Melhor investimento que fiz. Já recuperei o valor da assinatura só com as economias!" - Ana L.
                    </p>
                  </div>
                </div>
              )}

              {!currentQuestion.type || currentQuestion.type === "standard" ? (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-tight px-4">
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
                    className="w-full p-5 sm:p-6 rounded-xl border-2 border-white/20 bg-gradient-to-r from-white/5 to-white/10 hover:border-[#FFD700]/60 hover:shadow-xl hover:shadow-[#FFD700]/20 active:scale-[0.98] transition-all text-left group backdrop-blur-sm"
                    data-testid={`button-answer-${answer.id}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-[#1E90FF]/20 flex items-center justify-center group-hover:from-[#FFD700]/40 group-hover:to-[#1E90FF]/40 transition-colors border border-white/20">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD700]" />
                      </div>
                      <span className="text-base sm:text-lg font-medium text-white flex-1 pr-2">{answer.text}</span>
                      <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-[#FFD700] group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}


        {currentStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen px-4 sm:px-6 py-12 sm:py-16 bg-black"
          >
            <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
              {/* Antes / Depois Section */}
              <div className="text-center space-y-4 sm:space-y-6">
                <img src={logoImage} alt="Naiper's Club" className="h-16 sm:h-20 w-auto mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#FFD700] via-[#1E90FF] to-[#FFD700] bg-clip-text text-transparent">
                  Antes / Depois
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border-2 border-red-500/40 bg-red-500/10 space-y-4 backdrop-blur-xl">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Antes</h3>
                  <div className="space-y-2.5">
                    <p className="text-sm sm:text-base text-white/80">❌ Comprando errado e perdendo dinheiro</p>
                    <p className="text-sm sm:text-base text-white/80">❌ Sem vender por falta de conhecimento</p>
                  </div>
                </div>
                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl border-2 border-[#FFD700]/50 bg-gradient-to-br from-[#FFD700]/10 to-[#1E90FF]/10 space-y-4 backdrop-blur-xl shadow-xl shadow-[#FFD700]/20">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Depois</h3>
                  <div className="space-y-2.5">
                    <p className="text-sm sm:text-base text-white font-medium">✅ Comprando certo - Economizando até 70%</p>
                    <p className="text-sm sm:text-base text-white font-medium">✅ Lucrando de R$ 150 à 400 por venda feita</p>
                  </div>
                </div>
              </div>

              {/* CTA Button 1 */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleBuyClick}
                  className="w-full max-w-2xl py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] transition-all border-2 border-green-400/50"
                  data-testid="button-buy-now"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Comprar agora por 12x R$ 20,37
                </Button>
              </div>

              {/* Benefits Section */}
              <div className="bg-gradient-to-br from-[#FFD700]/15 via-[#1E90FF]/10 to-[#FFD700]/15 rounded-2xl p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8 border border-[#FFD700]/30 backdrop-blur-xl">
                <div className="space-y-3 sm:space-y-4">
                  {finalOfferBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-white">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-4 sm:space-y-6 pt-4 sm:pt-6">
                  <p className="text-lg sm:text-xl font-bold text-white">
                    Naiper's Club - o seu novo jeito de viver, consumir e lucrar com perfumes importados!
                  </p>
                </div>
              </div>

              {/* CTA Button 2 */}
              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleBuyClick}
                  className="w-full max-w-2xl py-6 sm:py-8 text-lg sm:text-xl font-bold rounded-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] transition-all border-2 border-green-400/50"
                  data-testid="button-buy-success"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Comprar agora por 12x R$ 20,37
                </Button>
              </div>

              {/* Benefits Badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/70">
                <span className="bg-white/10 px-3 py-1.5 rounded-full">🎁 Acesso imediato</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full">💥 De R$ 297 Por 197</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full">📲 Experiencie direto do seu celular</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-full">🚀 Comece hoje a economizar e lucrar com perfumes importados originais</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
