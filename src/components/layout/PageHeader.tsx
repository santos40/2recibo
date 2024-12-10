interface PageHeaderProps {
  userLogo?: string | null;
}

export const PageHeader = ({ userLogo }: PageHeaderProps) => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl font-heading font-bold text-gray-900 mb-4">
        Gerador de Recibos Autenticados
      </h1>
      <p className="text-gray-600 mb-6">
        Crie recibos profissionais com verificação digital
      </p>
      {userLogo && (
        <div className="flex justify-center">
          <img 
            src={userLogo} 
            alt="Logo da empresa" 
            className="max-h-24 object-contain"
          />
        </div>
      )}
    </header>
  );
};