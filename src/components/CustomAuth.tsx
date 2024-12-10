import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface CustomAuthProps {
  view?: 'sign_in' | 'sign_up';
}

const CustomAuth = ({ view = 'sign_in' }: CustomAuthProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const showBackButton = !location.pathname.includes('landing');

  const handleError = (error: Error) => {
    toast({
      title: "Erro",
      description: error.message,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl sm:text-2xl font-bold">
              {view === 'sign_in' ? 'Login' : 'Cadastro'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {showBackButton && (
          <Button
            variant="ghost"
            className="mb-6 sm:mb-8 flex items-center"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        )}

        <Card className="max-w-md mx-auto p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
            ONLINE RECIBO
          </h1>
          <Auth
            supabaseClient={supabase}
            view={view}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 rounded-md',
                input: 'w-full px-3 py-2 rounded-md border',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Cadastrar',
                  loading_button_label: 'Cadastrando...',
                  link_text: 'Já tem uma conta? Entre',
                },
                forgotten_password: {
                  link_text: 'Esqueceu sua senha?',
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando instruções...',
                  confirmation_text: 'Verifique seu email para redefinir sua senha',
                },
              },
            }}
            providers={[]}
          />
        </Card>
      </div>
    </div>
  );
};

export default CustomAuth;