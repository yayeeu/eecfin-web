import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMinistries, createMinistry, updateMinistry, deleteMinistry } from '@/lib/ministryService';
import { getMembersForDropdown, getEldersForDropdown } from '@/lib/memberService';
import { Ministry, Member } from '@/types/database.types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Pencil, Trash, Plus, ImagePlus, User, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Ministry name is required'),
  description: z.string().min(1, 'Description is required'),
  contact_person_id: z.string().min(1, 'Contact person is required'),
  contact_phone: z.string().optional(),
  photo: z.string().optional(),
  status: z.enum(['active', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

const emptyMinistry: Omit<Ministry, 'id' | 'created_at' | 'contact_name' | 'contact_email'> = {
  name: '',
  description: '',
  contact_person_id: '',
  contact_phone: '',
  status: 'active',
  photo: ''
};

const MinistryManager = () => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyMinistry
  });

  const { data: ministries, isLoading: ministriesLoading, error: ministriesError } = useQuery({
    queryKey: ['ministries'],
    queryFn: () => getMinistries(),
  });

  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ['members-dropdown'],
    queryFn: () => getMembersForDropdown(),
  });

  const { data: elders, isLoading: eldersLoading } = useQuery({
    queryKey: ['elders-dropdown'],
    queryFn: () => getEldersForDropdown(),
  });

  const activeMembers = members?.filter(member => member.status === 'active') || [];
  const activeElders = elders || [];

  const createMutation = useMutation({
    mutationFn: createMinistry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry added successfully');
      setShowDialog(false);
      form.reset(emptyMinistry);
    },
    onError: (error) => {
      toast.error(`Error adding ministry: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ministry }: { id: string; ministry: Partial<Omit<Ministry, 'id' | 'created_at'>> }) => 
      updateMinistry(id, ministry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry updated successfully');
      setShowDialog(false);
      setEditingMinistry(null);
    },
    onError: (error) => {
      toast.error(`Error updating ministry: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMinistry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry deleted successfully');
      setDeleteConfirm(null);
    },
    onError: (error) => {
      toast.error(`Error deleting ministry: ${error.message}`);
    }
  });

  const handleAddMinistry = () => {
    setEditingMinistry(null);
    form.reset(emptyMinistry);
    setShowDialog(true);
  };

  const handleEditMinistry = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    
    const contactPerson = ministry.contact_person_id ? 
      elders?.find(e => e.id === ministry.contact_person_id) || 
      members?.find(m => m.id === ministry.contact_person_id) : 
      null;
    
    setSelectedMember(contactPerson || null);

    form.reset({
      name: ministry.name,
      description: ministry.description,
      contact_person_id: ministry.contact_person_id || '',
      contact_phone: ministry.contact_phone || '',
      status: ministry.status,
      photo: ministry.photo || ''
    });
    
    setShowDialog(true);
  };

  const handleSubmit = (values: FormValues) => {
    const selectedMember = elders?.find(e => e.id === values.contact_person_id) || 
                           members?.find(m => m.id === values.contact_person_id);
    
    if (!selectedMember) {
      toast.error('Selected contact person not found');
      return;
    }

    const ministryData = {
      ...values,
      contact_name: selectedMember.name || '',
      contact_email: selectedMember.email || ''
    };

    if (editingMinistry?.id) {
      updateMutation.mutate({ 
        id: editingMinistry.id, 
        ministry: ministryData 
      });
    } else {
      createMutation.mutate(ministryData as any);
    }
  };

  const handleContactPersonChange = (contactPersonId: string) => {
    const elder = elders?.find(e => e.id === contactPersonId);
    const member = members?.find(m => m.id === contactPersonId);
    setSelectedMember(elder || member || null);
    form.setValue('contact_person_id', contactPersonId);
  };

  const isLoading = ministriesLoading || membersLoading || eldersLoading;

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading ministries...</div>;
  }

  if (ministriesError) {
    return <div className="p-8 text-red-500">Error loading ministries: {ministriesError.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ministries ({ministries?.length || 0})</h2>
        <Button onClick={handleAddMinistry} className="bg-eecfin-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add Ministry
        </Button>
      </div>

      {ministries && ministries.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => {
            const contactPerson = members?.find(m => m.id === ministry.contact_person_id) || null;
            const contactElder = elders?.find(e => e.id === ministry.contact_person_id) || null;
            const isElder = !!contactElder;
            
            return (
              <Card key={ministry.id} className="overflow-hidden">
                {ministry.photo ? (
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={ministry.photo} 
                      alt={ministry.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
                    <ImagePlus className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{ministry.name}</CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      ministry.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ministry.status}
                    </span>
                  </div>
                  <CardDescription>
                    Contact: {ministry.contact_name}
                    {(contactPerson || contactElder) && (
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        <span>{isElder ? 'Contact Elder' : 'Member'}: {isElder ? contactElder!.name : contactPerson!.name}</span>
                      </div>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3">{ministry.description}</p>
                  
                  {contactElder && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        <a href={`tel:${contactElder.phone}`} className="hover:text-eecfin-gold">
                          {contactElder.phone}
                        </a>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        <a href={`mailto:${contactElder.email}`} className="hover:text-eecfin-gold">
                          {contactElder.email}
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditMinistry(ministry)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(ministry.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No ministries found. Click 'Add Ministry' to create one.</p>
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}</DialogTitle>
            <DialogDescription>
              {editingMinistry 
                ? 'Update the ministry information in the form below.'
                : 'Fill in the details to add a new ministry to the system.'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ministry Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter ministry name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter ministry description" 
                        rows={4} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_person_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Elder *</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={handleContactPersonChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a contact elder" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2 border-b">
                            <p className="font-semibold">Elders</p>
                          </div>
                          {activeElders.length > 0 ? (
                            activeElders.map((elder) => (
                              <SelectItem key={elder.id} value={elder.id}>
                                {elder.name} {elder.email ? `(${elder.email})` : ''}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No active elders available
                            </SelectItem>
                          )}
                          
                          <div className="p-2 border-b mt-2">
                            <p className="font-semibold">Other Members</p>
                          </div>
                          {activeMembers.length > 0 ? (
                            activeMembers.map((member) => (
                              <SelectItem key={member.id} value={member.id}>
                                {member.name} {member.email ? `(${member.email})` : ''}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No active members available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Preferably select an elder as the contact person
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedMember && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium">Selected Contact Information:</p>
                  <p className="text-sm">Name: {selectedMember.name}</p>
                  <p className="text-sm">Email: {selectedMember.email}</p>
                  {selectedMember.phone && <p className="text-sm">Phone: {selectedMember.phone}</p>}
                </div>
              )}

              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Contact Phone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter additional contact phone number (optional)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional additional contact phone for this ministry
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter photo URL (optional)" 
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
                    <FormLabel>Status *</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ministry status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-eecfin-navy">
                  {editingMinistry ? 'Update Ministry' : 'Add Ministry'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ministry
              from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MinistryManager;
