export interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  is_active: boolean;
  status: string;
  receiptsCount?: number;
  subscription: {
    plan_type: string;
    active: boolean;
  } | null;
}