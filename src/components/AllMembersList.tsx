
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Member } from '@/types/database.types';
import { getAllMembers, updateMember } from '@/lib/memberService';
import { Loader2, User, Pencil, BadgeCheck, UserPlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MemberDetailView from './members/MemberDetailView';
import ElderAssignmentSelect from './members/ElderAssignmentSelect';

const AllMembersList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const { data: members, isLoading, isError } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers
  });

  const updateMemberMutation = useMutation({
    mutationFn: ({id, member}: {id: string, member: Partial<Member>}) => 
      updateMember(id, member),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      toast({
        title: "Member updated",
        description: "Member information has been updated successfully."
      });
      setEditingMember(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update member. Please try again.",
        variant: "destructive"
      });
      console.error("Error updating member:", error);
    }
  });

  const form = useForm<Partial<Member>>({
    defaultValues: {
      name: '',
      role: '',
      email: '',
      phone: '',
      address: '',
      gender: '',
      marital_status: '',
      spouse_name: '',
      children_names: '',
      previous_church: '',
      role_in_previous_church: '',
      emergency_contact: '',
      has_letter_from_prev_church: false,
      is_baptised: false,
      num_children: 0,
      status: 'active'
    }
  });

  const openEditDialog = (member: Member) => {
    setEditingMember(member);
    form.reset({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      address: member.address,
      gender: member.gender,
      marital_status: member.marital_status,
      spouse_name: member.spouse_name,
      children_names: member.children_names,
      previous_church: member.previous_church,
      role_in_previous_church: member.role_in_previous_church,
      emergency_contact: member.emergency_contact,
      has_letter_from_prev_church: member.has_letter_from_prev_church,
      is_baptised: member.is_baptised,
      num_children: member.num_children,
      status: member.status || 'active'
    });
  };

  const handleSubmit = (data: Partial<Member>) => {
    if (!editingMember) return;
    
    updateMemberMutation.mutate({
      id: editingMember.id,
      member: data
    });
  };

  const viewMemberDetails = (member: Member) => {
    setSelectedMember(member);
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  };

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
            <TableHead>Status</TableHead>
            <TableHead>Member Since</TableHead>
            <TableHead>Assigned Elder</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow 
              key={member.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => viewMemberDetails(member)}
            >
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
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status === 'active' && <BadgeCheck className="w-3 h-3 mr-1" />}
                  {member.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>
                {member.created_at ? format(new Date(member.created_at), 'MMM d, yyyy') : 'Unknown'}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                {member.role !== 'Elder' ? (
                  <ElderAssignmentSelect member={member} onAssignmentChanged={refreshData} />
                ) : (
                  <span className="text-gray-500">N/A</span>
                )}
              </TableCell>
              <TableCell>
                {member.phone || 'N/A'}
              </TableCell>
              <TableCell>
                {member.email || 'N/A'}
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditDialog(member);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedMember && (
        <MemberDetailView 
          member={selectedMember} 
          onClose={() => setSelectedMember(null)} 
        />
      )}

      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member information below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Member name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Member role" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter full address (for map location)"
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || 'active'}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_baptised"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Is Baptised
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="num_children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0"
                          placeholder="Number of children" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value) || 0)} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marital_status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value || ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select marital status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spouse_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Spouse Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Spouse name (if applicable)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="children_names"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children Names</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Names of children (if applicable), separated by commas" 
                          className="min-h-[80px]" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previous_church"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Church</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of previous church" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role_in_previous_church"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role in Previous Church</FormLabel>
                      <FormControl>
                        <Input placeholder="Role in previous church" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emergency_contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Emergency contact information" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="has_letter_from_prev_church"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Has Letter from Previous Church
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {editingMember && editingMember.role !== 'Elder' && (
                <div className="pt-4 border-t mt-6">
                  <FormLabel className="block mb-2">Assigned Elder</FormLabel>
                  <ElderAssignmentSelect member={editingMember} onAssignmentChanged={refreshData} />
                </div>
              )}
              
              <DialogFooter className="mt-6">
                <Button type="button" variant="outline" onClick={() => setEditingMember(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateMemberMutation.isPending}>
                  {updateMemberMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllMembersList;
