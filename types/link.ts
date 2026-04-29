export interface Link {
  id: number;
  username: string;
  original_url: string;
  short_code: string;
  created_at: string;   // Viene como string ISO de Go
  last_accessed_at?: string; 
  click_count: number;
  is_public: boolean;
}
