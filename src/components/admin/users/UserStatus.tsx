import { Switch } from "@/components/ui/switch";

interface UserStatusProps {
  isActive: boolean;
  onChange: () => void;
}

export const UserStatus = ({ isActive, onChange }: UserStatusProps) => {
  return <Switch checked={isActive} onCheckedChange={onChange} />;
};