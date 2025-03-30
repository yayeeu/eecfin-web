
export interface Slide {
  id: string;
  created_at?: string;
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  order: number;
}

export interface Ministry {
  id: string;
  created_at?: string;
  name: string;
  description: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  status: 'active' | 'inactive';
  photo?: string;
}

export interface Elder {
  id: string;
  created_at?: string;
  name: string;
  phone?: string;
  email?: string;
  image?: string;
  role: string;
  ministry_id?: string;
  // Include joined data
  ministries?: Pick<Ministry, 'id' | 'name'>;
}

export interface Database {
  public: {
    Tables: {
      slides: {
        Row: Slide;
        Insert: Omit<Slide, 'id' | 'created_at'>;
        Update: Partial<Omit<Slide, 'id' | 'created_at'>>;
      };
      ministries: {
        Row: Ministry;
        Insert: Omit<Ministry, 'id' | 'created_at'>;
        Update: Partial<Omit<Ministry, 'id' | 'created_at'>>;
      };
      elders: {
        Row: Elder;
        Insert: Omit<Elder, 'id' | 'created_at'>;
        Update: Partial<Omit<Elder, 'id' | 'created_at'>>;
      };
    };
    Views: {};
    Functions: {};
  };
}
