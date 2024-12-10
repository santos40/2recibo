import { Crown } from "lucide-react";

export const AuthHeader = () => {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <Crown className="h-8 w-8 text-yellow-300" />
      <h1 className="text-2xl font-bold text-center">ONLINE RECIBO</h1>
    </div>
  );
};