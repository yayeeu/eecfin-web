
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2, UserCheck, Search, Phone, Mail, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Member } from '@/types/database.types';
import { Badge } from '@/components/ui/badge';
import { getMembersByElderId } from '@/lib/memberService';

interface MyMembersListProps {
  onMemberSelect: (memberId: string) => void;
}

const MyMembersList: React.FC<MyMembersListProps> = ({ onMemberSelect }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Since we removed auth, we'll show a default empty state for now
  const elderId = null;

  const { 
    data: members, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['members-by-elder', elderId],
    queryFn: () => elderId ? getMembersByElderId(elderId) : Promise.resolve([]),
    enabled: !!elderId
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading assigned members...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading assigned members.</p>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  // Filter members based on search term
  const filteredMembers = members?.filter(member => 
    member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone?.includes(searchTerm)
  ) || [];

  // Show empty state since we removed authentication
  return (
    <div className="text-center py-10">
      <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No assigned members</h3>
      <p className="mt-1 text-sm text-gray-500">
        Authentication system has been removed. This feature requires user authentication to function.
      </p>
    </div>
  );
};

export default MyMembersList;
