const API_BASE_URL = import.meta.env.VITE_EECFIN_API_URL || 'http://localhost:8084';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  contact_email?: string;
  status: 'active' | 'inactive';
  photo?: string;
  is_active?: boolean;
  contact_person_id?: string;
  contact_elder_id?: string;
  contact_person_name?: string;
  contact_elder_name?: string;
  created_at: string;
  updated_at?: string;
}

export interface Elder {
  id: string;
  member_id: string;
  eldership_status: 'active' | 'inactive';
  member_name?: string;
  member_email?: string;
  member_phone?: string;
  member_image?: string;
  created_at: string;
  updated_at?: string;
}

class ApiService {
  private token: string | null = null;
  private readonly isDevelopment = import.meta.env.DEV;

  setToken(token: string | null) {
    this.token = token;
  }

  private log(message: string, ...args: any[]) {
    if (this.isDevelopment) {
      console.log(`[API] ${message}`, ...args);
    }
  }

  private logError(message: string, error: any) {
    console.error(`[API Error] ${message}`, error);
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    this.log(`Request: ${options.method || 'GET'} ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      let data;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
      } catch (jsonError) {
        this.logError('JSON parsing error', jsonError);
        return { error: 'Invalid JSON response from server' };
      }

      if (!response.ok) {
        const errorMessage = data?.error || `Request failed with status ${response.status}`;
        this.logError('Request failed', { status: response.status, error: errorMessage });
        return { error: errorMessage };
      }

      return { data };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error';
      this.logError('Network error', error);
      return { error: errorMessage };
    }
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request<{ status: string }>('/api/health');
  }

  // Ministries methods
  async getMinistries(): Promise<ApiResponse<{ ministries: Ministry[] }>> {
    return this.request<{ ministries: Ministry[] }>('/api/ministries');
  }

  async getMinistry(id: string): Promise<ApiResponse<{ ministry: Ministry }>> {
    return this.request<{ ministry: Ministry }>(`/api/ministries/${id}`);
  }

  async createMinistry(ministry: Omit<Ministry, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<{ ministry: Ministry }>> {
    return this.request<{ ministry: Ministry }>('/api/ministries', {
      method: 'POST',
      body: JSON.stringify(ministry),
    });
  }

  async updateMinistry(id: string, ministry: Partial<Ministry>): Promise<ApiResponse<{ ministry: Ministry }>> {
    return this.request<{ ministry: Ministry }>(`/api/ministries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ministry),
    });
  }

  async deleteMinistry(id: string): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>(`/api/ministries/${id}`, {
      method: 'DELETE',
    });
  }

  async toggleMinistryActive(id: string): Promise<ApiResponse<{ ministry: Ministry }>> {
    return this.request<{ ministry: Ministry }>(`/api/ministries/${id}/toggle-active`, {
      method: 'PATCH',
    });
  }

  // Elders methods
  async getElders(): Promise<ApiResponse<{ elders: Elder[] }>> {
    return this.request<{ elders: Elder[] }>('/api/elders');
  }

  async getElder(id: string): Promise<ApiResponse<{ elder: Elder }>> {
    return this.request<{ elder: Elder }>(`/api/elders/${id}`);
  }
}

export const apiService = new ApiService();
