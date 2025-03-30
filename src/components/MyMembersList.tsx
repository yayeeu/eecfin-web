
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
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { getMembersByElderId } from '@/lib/memberService';

interface MyMembersListProps {
  onMemberSelect: (memberId: string) => void;
}

const MyMembersList: React.FC<MyMembersListProps> = ({ onMemberSelect }) => {
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const elderId = userProfile?.id;

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

  if (!elderId) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You need to be logged in as an elder to view assigned members.</p>
      </div>
    );
  }

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

  if (filteredMembers.length === 0 && !searchTerm) {
    return (
      <div className="text-center py-10">
        <UserCheck className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No assigned members</h3>
        <p className="mt-1 text-sm text-gray-500">
          You don't have any members assigned to you yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          Refresh
        </Button>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="text-center py-10">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No members found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try searching with a different term
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {member.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          <span className="text-sm">{member.phone}</span>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          <span className="text-sm">{member.email}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onMemberSelect(member.id)}>
                          View Contact Logs
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyMembersList;
