
export interface Slide {
  id: string;
  created_at?: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  order: number;
}

export interface Database {
  public: {
    Tables: {
      slides: {
        Row: Slide;
        Insert: Omit<Slide, 'id' | 'created_at'>;
        Update: Partial<Omit<Slide, 'id' | 'created_at'>>;
      };
    };
    Views: {};
    Functions: {};
  };
}
