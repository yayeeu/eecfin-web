
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignElderToMember, removeElderAssignment, getEldersForDropdown } from '@/lib/memberService';
import { Member } from '@/types/database.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, UserX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ElderAssignmentSelectProps {
  member: Member;
  onAssignmentChanged?: () => void;
}

const ElderAssignmentSelect: React.FC<ElderAssignmentSelectProps> = ({ member, onAssignmentChanged }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedElderId, setSelectedElderId] = useState<string | null>(
    member.assigned_elder?.elder_id || null
  );

  // Query for getting all elders for dropdown
  const { data: elders, isLoading: isLoadingElders } = useQuery({
    queryKey: ['elders-dropdown'],
    queryFn: getEldersForDropdown
  });

  // Mutation for assigning an elder to a member
  const assignElderMutation = useMutation({
    mutationFn: ({ memberId, elderId }: { memberId: string; elderId: string }) => 
      assignElderToMember(memberId, elderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      if (onAssignmentChanged) onAssignmentChanged();
      toast({
        title: "Elder assigned",
        description: "Elder has been successfully assigned to this member.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to assign elder: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Mutation for removing an elder assignment
  const removeElderMutation = useMutation({
    mutationFn: (memberId: string) => removeElderAssignment(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      if (onAssignmentChanged) onAssignmentChanged();
      toast({
        title: "Elder removed",
        description: "Elder assignment has been removed from this member.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to remove elder assignment: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  // Update the selected elder when the member data changes
  useEffect(() => {
    setSelectedElderId(member.assigned_elder?.elder_id || null);
  }, [member]);

  // Handle elder selection change
  const handleElderChange = (value: string) => {
    setSelectedElderId(value);
    assignElderMutation.mutate({
      memberId: member.id,
      elderId: value
    });
  };

  // Handle removing elder assignment
  const handleRemoveElder = () => {
    if (window.confirm("Are you sure you want to remove this elder assignment?")) {
      setSelectedElderId(null);
      removeElderMutation.mutate(member.id);
    }
  };

  if (isLoadingElders) {
    return <div className="flex items-center"><Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading elders...</div>;
  }

  return (
    <div className="flex items-start gap-2">
      <div className="flex-1">
        <Select
          value={selectedElderId || ''}
          onValueChange={handleElderChange}
          disabled={assignElderMutation.isPending}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an elder to assign" />
          </SelectTrigger>
          <SelectContent>
            {elders && elders.map((elder) => (
              <SelectItem key={elder.id} value={elder.id}>
                {elder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedElderId && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleRemoveElder}
          disabled={removeElderMutation.isPending}
          className="flex-shrink-0"
        >
          {removeElderMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserX className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
};

export default ElderAssignmentSelect;
