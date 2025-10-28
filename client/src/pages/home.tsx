import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { InsertQuizResponse, QuizQuestion } from "@shared/schema";
import { insertQuizResponseSchema } from "@shared/schema";
import { Sparkles, Video, TrendingUp, Users, CheckCircle2, ArrowRight, Play } from "lucide-react";
import heroImage from "@assets/generated_images/Video_creator_hero_image_1da409f3.png";

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Você gostaria de transformar seus vídeos em conteúdos que conectam com a audiência, fazem seu perfil crescer e aceleram as vendas dos seus produtos ou serviços?",
    answers: [
      { id: "sim-certeza", text: "Sim, com certeza!", icon: "sparkles" },
      { id: "parece-sonho", text: "Até parece um sonho" },
    ],
  },
  {
    id: 2,
    question: "Qual é o seu maior desafio hoje com criação de vídeos?",
    answers: [
      { id: "sem-tempo", text: "Não tenho tempo suficiente", icon: "clock" },
      { id: "sem-ideias", text: "Falta de ideias criativas", icon: "lightbulb" },
      { id: "baixo-engajamento", text: "Baixo engajamento nos vídeos", icon: "trending-down" },
      { id: "nao-sei-editar", text: "Não sei editar profissionalmente", icon: "scissors" },
    ],
  },
  {
    id: 3,
    question: "O que você mais deseja alcançar com seus vídeos?",
    answers: [
      { id: "mais-views", text: "Mais visualizações e alcance", icon: "eye" },
      { id: "mais-vendas", text: "Aumentar minhas vendas", icon: "shopping-cart" },
      { id: "autoridade", text: "Me tornar autoridade no meu nicho", icon: "award" },
      { id: "seguidores", text: "Crescer minha base de seguidores", icon: "users" },
    ],
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState<"hero" | "quiz" | "form" | "success">("hero");
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  const form = useForm<InsertQuizResponse>({
    resolver: zodResolver(insertQuizResponseSchema),
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
    mutationFn: async (data: InsertQuizResponse) => {
      return await apiRequest("POST", "/api/quiz-responses", data);
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
    
    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    } else {
      setTimeout(() => setCurrentStep("form"), 300);
    }
  };

  const handleSubmit = (data: InsertQuizResponse) => {
    submitMutation.mutate(data);
  };

  const progress = currentStep === "quiz" ? ((quizStep + 1) / quizQuestions.length) * 100 : 0;

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
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Mais de 10.000 criadores já transformaram seus resultados</span>
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Me responda uma coisa...
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
              >
                Você gostaria de transformar seus <span className="font-bold text-white">vídeos</span> em conteúdos que{" "}
                <span className="font-bold text-white">conectam</span> com a audiência, fazem seu{" "}
                <span className="font-bold text-white">perfil crescer</span> e aceleram as{" "}
                <span className="font-bold text-white">vendas</span> dos seus produtos ou serviços?
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
                  className="px-12 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  data-testid="button-start-quiz"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Sim, com certeza!
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-8 pt-8 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  <span className="text-sm">Edição Profissional</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Mais Engajamento</span>
                </div>
                <div className="flex items-center gap-2 hidden sm:flex">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Crescimento Real</span>
                </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center leading-tight">
                {quizQuestions[quizStep].question}
              </h2>

              <div className="space-y-4">
                {quizQuestions[quizStep].answers.map((answer, index) => (
                  <motion.button
                    key={answer.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(quizQuestions[quizStep].id, answer.id)}
                    className="w-full p-6 rounded-xl border-2 border-border bg-card hover-elevate active-elevate-2 transition-all text-left group"
                    data-testid={`button-answer-${answer.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        {answer.icon === "sparkles" && <Sparkles className="w-6 h-6 text-primary" />}
                        {!answer.icon && <CheckCircle2 className="w-6 h-6 text-primary" />}
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
            <div className="max-w-md w-full space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Receba seu resultado personalizado!
                </h2>
                <p className="text-lg text-muted-foreground">
                  Preencha seus dados para desbloquear estratégias exclusivas baseadas nas suas respostas
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">
                          Nome completo *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Seu nome"
                            className="h-12 text-base"
                            data-testid="input-name"
                          />
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
                        <FormLabel className="text-base font-medium">
                          E-mail *
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="seu@email.com"
                            className="h-12 text-base"
                            data-testid="input-email"
                          />
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
                        <FormLabel className="text-base font-medium">
                          WhatsApp (opcional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="tel"
                            placeholder="(00) 00000-0000"
                            className="h-12 text-base"
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitMutation.isPending}
                    className="w-full py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-primary via-pink-500 to-purple-600 hover:shadow-xl"
                    data-testid="button-submit-form"
                  >
                    {submitMutation.isPending ? "Enviando..." : "Receber Meu Resultado"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Seus dados estão protegidos. Não compartilhamos com terceiros.
                  </p>
                </form>
              </Form>
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
                Enviamos seu resultado personalizado para <span className="font-semibold text-foreground">{form.getValues("email")}</span>
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-xl p-6 space-y-4">
                <p className="text-base text-foreground">
                  <strong>Próximos passos:</strong>
                </p>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Confira sua caixa de entrada (e spam também!)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Descubra estratégias personalizadas para seus vídeos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Comece a transformar seus resultados hoje mesmo!</span>
                  </li>
                </ul>
              </div>

              <Button
                size="lg"
                onClick={() => window.location.reload()}
                variant="outline"
                className="px-8 py-6 rounded-full"
                data-testid="button-restart"
              >
                Fazer o Quiz Novamente
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
