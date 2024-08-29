export type JobPosition = {
  job_position_id?: string;
  job_position_user_id?: string;
  job_position_name?: string;
  job_position_description?: string;
  job_position_key_points?: string[];
  job_position_is_open?: boolean;
  job_position_created_at?: string | null;
  job_position_deleted_at?: string | null;
  report_final_analysis?: Array<any>
}