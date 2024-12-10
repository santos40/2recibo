import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AudioInstructions = () => {
  const playAudio = () => {
    const speech = new SpeechSynthesisUtterance(
      "Para criar sua assinatura digital, use o mouse ou o dedo na tela para desenhar sua assinatura no campo abaixo. " +
      "Se precisar recomeçar, clique em Limpar. " +
      "Quando estiver satisfeito com sua assinatura, clique em Salvar Assinatura para utilizá-la em seus recibos."
    );
    speech.lang = 'pt-BR';
    window.speechSynthesis.speak(speech);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={playAudio}
      className="mb-2"
    >
      <Volume2 className="h-4 w-4 mr-2" />
      Ouvir como criar sua assinatura
    </Button>
  );
};