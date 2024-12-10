import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CompanyInfoAudio = () => {
  const playAudio = () => {
    const speech = new SpeechSynthesisUtterance(
      "Cadastre os dados da sua empresa para que eles apareçam automaticamente em seus futuros recibos. " +
      "Você pode incluir o nome da empresa, informações adicionais, site e redes sociais."
    );
    speech.lang = 'pt-BR';
    window.speechSynthesis.speak(speech);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={playAudio}
      className="mb-4"
    >
      <Volume2 className="h-4 w-4 mr-2" />
      Ouvir instruções
    </Button>
  );
};