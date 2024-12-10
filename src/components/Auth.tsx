import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const AuthComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold">Cadastro</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <Button
          variant="ghost"
          className="mb-8 flex items-center"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-center mb-6">ONLINE RECIBO</h1>
          <Auth
            supabaseClient={supabase}
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
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'Seu email',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Cadastrar',
                  loading_button_label: 'Cadastrando...',
                  social_provider_text: 'Cadastrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
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

export default AuthComponent;