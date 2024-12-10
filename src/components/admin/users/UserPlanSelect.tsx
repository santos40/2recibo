import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface UserPlanSelectProps {
  currentPlan: string;
  onChange: (plan: string) => void;
}

export const UserPlanSelect = ({ currentPlan, onChange }: UserPlanSelectProps) => {
  return (
    <RadioGroup
      defaultValue={currentPlan}
      onValueChange={onChange}
      className="flex gap-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="start" id="start" />
        <Label htmlFor="start">Start</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="gold" id="gold" />
        <Label htmlFor="gold">Gold</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="supergold" id="supergold" />
        <Label htmlFor="supergold">Super Gold</Label>
      </div>
    </RadioGroup>
  );
};