interface ProfileInfoProps {
  name: string | null;
  phone: string | null;
  email: string | null;
  activePlan: string | null;
  companyName?: string | null;
  companyInfo?: string | null;
  websiteUrl?: string | null;
  socialMediaLinks?: any;
}

export const ProfileInfo = ({ 
  name, 
  phone, 
  email, 
  activePlan,
  companyName,
  companyInfo,
  websiteUrl,
  socialMediaLinks 
}: ProfileInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p>
          <strong>Nome:</strong> {name || "Não informado"}
        </p>
        <p>
          <strong>Telefone:</strong> {phone || "Não informado"}
        </p>
        <p>
          <strong>Email:</strong> {email || "Não informado"}
        </p>
        <p>
          <strong>Plano Ativo:</strong> {activePlan || "Nenhum plano ativo"}
        </p>
      </div>

      {(companyName || companyInfo || websiteUrl || socialMediaLinks) && (
        <div className="pt-4 border-t space-y-2">
          <h3 className="font-medium mb-2">Informações da Empresa</h3>
          {companyName && (
            <p>
              <strong>Nome da Empresa:</strong> {companyName}
            </p>
          )}
          {companyInfo && (
            <p>
              <strong>Informações Adicionais:</strong> {companyInfo}
            </p>
          )}
          {websiteUrl && (
            <p>
              <strong>Website:</strong>{" "}
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {websiteUrl}
              </a>
            </p>
          )}
          {socialMediaLinks && Object.keys(socialMediaLinks).length > 0 && (
            <div>
              <strong>Redes Sociais:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                {socialMediaLinks.facebook && (
                  <li>
                    <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Facebook
                    </a>
                  </li>
                )}
                {socialMediaLinks.instagram && (
                  <li>
                    <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Instagram
                    </a>
                  </li>
                )}
                {socialMediaLinks.linkedin && (
                  <li>
                    <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      LinkedIn
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};