
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Ministry } from '@/lib/api';
import { toast } from 'sonner';

export const useMinistryMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (ministry: Omit<Ministry, 'id' | 'created_at' | 'updated_at'>) => {
      const response = await apiService.createMinistry(ministry);
      if (response.error) throw new Error(response.error);
      return response.data!.ministry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry added successfully');
    },
    onError: (error: any) => {
      console.error('Error adding ministry:', error);
      toast.error(`Error adding ministry: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ministry }: { id: string; ministry: Partial<Omit<Ministry, 'id' | 'created_at'>> }) => {
      const response = await apiService.updateMinistry(id, ministry);
      if (response.error) throw new Error(response.error);
      return response.data!.ministry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry updated successfully');
    },
    onError: (error: any) => {
      console.error('Error updating ministry:', error);
      toast.error(`Error updating ministry: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiService.deleteMinistry(id);
      if (response.error) throw new Error(response.error);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry deleted successfully');
    },
    onError: (error: any) => {
      console.error('Error deleting ministry:', error);
      toast.error(`Error deleting ministry: ${error.message}`);
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation
  };
};
