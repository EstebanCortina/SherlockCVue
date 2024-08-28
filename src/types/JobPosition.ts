export type JobPosition = {
  id?: string;
  user_id?: string;
  name?: string;
  description?: string;
  key_points?: string[];
  is_open?: boolean;
  created_at?: string | null;
  deleted_at?: string | null;
}