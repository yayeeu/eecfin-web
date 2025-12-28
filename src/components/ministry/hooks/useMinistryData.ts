
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';

export const useMinistryData = () => {
  const { 
    data: ministriesResponse, 
    isLoading: ministriesLoading, 
    error: ministriesError 
  } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const response = await apiService.getMinistries();
      if (response.error) throw new Error(response.error);
      const ministries = (response.data?.ministries || [])
        .sort((a, b) => a.name.localeCompare(b.name));
      return ministries;
    },
  });
  
  const ministries = ministriesResponse || [];

  const { 
    data: members, 
    isLoading: membersLoading 
  } = useQuery({
    queryKey: ['members-dropdown'],
    queryFn: async () => {
      // TODO: Implement when members API is available
      return [];
    },
  });

  const { 
    data: eldersResponse, 
    isLoading: eldersLoading 
  } = useQuery({
    queryKey: ['elders-dropdown'],
    queryFn: async () => {
      const response = await apiService.getElders();
      if (response.error) throw new Error(response.error);
      const elders = (response.data?.elders || [])
        .filter(elder => elder.eldership_status === 'active')
        .map(elder => ({
          id: elder.member_id,
          name: elder.member_name || 'Unknown',
          email: elder.member_email || '',
          phone: elder.member_phone || '',
          status: elder.eldership_status === 'active' ? 'active' : 'inactive'
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      return elders;
    },
  });
  
  const elders = eldersResponse || [];

  const isLoading = ministriesLoading || membersLoading || eldersLoading;

  return {
    ministries,
    members: members || [],
    elders,
    isLoading,
    ministriesError
  };
};
