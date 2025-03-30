
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMinistry, updateMinistry, deleteMinistry } from '@/lib/ministryService';
import { Ministry } from '@/types/database.types';
import { toast } from 'sonner';

export const useMinistryMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createMinistry,
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
    mutationFn: ({ id, ministry }: { id: string; ministry: Partial<Omit<Ministry, 'id' | 'created_at'>> }) => 
      updateMinistry(id, ministry),
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
    mutationFn: deleteMinistry,
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
