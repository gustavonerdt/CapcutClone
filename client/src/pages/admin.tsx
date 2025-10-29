import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Users, MousePointerClick, ShoppingCart, TrendingDown, Eye } from "lucide-react";
import logoImage from "@assets/LOGOTIPO_NAIPERS_CLUB (1)_1761695015269.png";
import { apiRequest } from "@/lib/queryClient";

interface Analytics {
  totalSessions: number;
  totalPageViews: number;
  totalFormSubmissions: number;
  totalBuyClicks: number;
  answerClicksByQuestion: { [key: string]: { [answerId: string]: number } };
  exitsByStep: { [step: string]: number };
  conversionFunnel: { step: string; count: number; }[];
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const status = await apiRequest("GET", "/api/auth/status", undefined) as any;
      if (status.isAuthenticated) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return await apiRequest("POST", "/api/auth/login", credentials);
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      setLoginError("");
    },
    onError: () => {
      setLoginError("Credenciais inválidas!");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/auth/logout", {});
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
    },
  });

  const { data: analytics, isLoading } = useQuery<Analytics>({
    queryKey: ["/api/analytics"],
    enabled: isAuthenticated,
  });

  const { data: responses } = useQuery<any[]>({
    queryKey: ["/api/quiz-responses"],
    enabled: isAuthenticated,
  });

  const handleLogin = () => {
    loginMutation.mutate({ username, password });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <Card className="max-w-md w-full p-8 space-y-6">
          <div className="text-center space-y-4">
            <img src={logoImage} alt="Naiper's Club Admin" className="h-20 w-auto mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Entre com suas credenciais</p>
          </div>
          <div className="space-y-4">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="h-12 text-base"
              data-testid="input-admin-username"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Senha"
              className="h-12 text-base"
              data-testid="input-admin-password"
            />
            {loginError && (
              <p className="text-sm text-destructive text-center">{loginError}</p>
            )}
            <Button 
              onClick={handleLogin} 
              disabled={loginMutation.isPending}
              className="w-full h-12 text-lg font-semibold"
              data-testid="button-admin-login"
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isLoading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Carregando dashboard...</p>
      </div>
    );
  }

  const conversionRate = analytics.totalSessions > 0 
    ? ((analytics.totalBuyClicks / analytics.totalSessions) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Naiper's Club" className="h-16 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
              <p className="text-muted-foreground">Métricas e análises em tempo real</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            data-testid="button-logout"
          >
            {logoutMutation.isPending ? "Saindo..." : "Sair"}
          </Button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total de Visitantes</p>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.totalSessions}</p>
            <p className="text-xs text-muted-foreground">Sessões únicas rastreadas</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total de Visualizações</p>
              <Eye className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.totalPageViews}</p>
            <p className="text-xs text-muted-foreground">Páginas visualizadas</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Cliques em Comprar</p>
              <ShoppingCart className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.totalBuyClicks}</p>
            <p className="text-xs text-muted-foreground">Taxa de conversão: {conversionRate}%</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Formulários Enviados</p>
              <MousePointerClick className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.totalFormSubmissions}</p>
            <p className="text-xs text-muted-foreground">Leads capturados</p>
          </Card>
        </div>

        {/* Conversion Funnel */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Funil de Conversão</h2>
          </div>
          <div className="space-y-3">
            {analytics.conversionFunnel.map((step, index) => {
              const percentage = analytics.totalSessions > 0 
                ? ((step.count / analytics.totalSessions) * 100).toFixed(1)
                : "0.0";
              return (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{step.step}</span>
                    <span className="text-muted-foreground">{step.count} ({percentage}%)</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-pink-500 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Answer Distribution */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MousePointerClick className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Cliques por Resposta</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(analytics.answerClicksByQuestion).map(([step, answers]) => (
              <div key={step} className="space-y-3">
                <h3 className="font-semibold text-foreground capitalize">{step.replace("_", " ")}</h3>
                <div className="space-y-2">
                  {Object.entries(answers as { [key: string]: number }).map(([answerId, count]) => (
                    <div key={answerId} className="flex items-center justify-between text-sm p-2 rounded bg-muted">
                      <span className="text-foreground truncate">{answerId}</span>
                      <span className="font-semibold text-primary">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Exit Points */}
        {Object.keys(analytics.exitsByStep).length > 0 && (
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-bold text-foreground">Pontos de Abandono</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analytics.exitsByStep).map(([step, count]) => (
                <div key={step} className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                  <p className="text-sm text-muted-foreground capitalize">{step.replace("_", " ")}</p>
                  <p className="text-2xl font-bold text-destructive">{count as number}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recent Leads */}
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Últimos Leads Capturados</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-foreground">Nome</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">WhatsApp</th>
                  <th className="text-left py-3 px-4 font-medium text-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {responses?.slice(0, 10).map((response: any) => (
                  <tr key={response.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-foreground">{response.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{response.email}</td>
                    <td className="py-3 px-4 text-muted-foreground">{response.phone || "—"}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(response.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
