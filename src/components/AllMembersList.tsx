
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@/types/database.types';
import { getAllMembers } from '@/lib/memberService';
import { Loader2, User } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

const AllMembersList = () => {
  const { data: members, isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading members...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Error loading members. Please try again later.</p>
      </div>
    );
  }

  if (!members || members.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No members found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Member Since</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name || 'Member'} 
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }} 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                  {member.name || 'Unnamed Member'}
                </div>
              </TableCell>
              <TableCell>
                {member.roles ? member.roles.name : (member.role || 'Member')}
              </TableCell>
              <TableCell>
                {member.created_at ? format(new Date(member.created_at), 'MMM d, yyyy') : 'Unknown'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllMembersList;
