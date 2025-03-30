import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Elder, Ministry } from '@/types/database.types';
import { getElders, createElder, updateElder, deleteElder } from '@/lib/elderService';
import { getMinistries } from '@/lib/ministryService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2, Plus, Loader2, Image } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define the form schema
const elderFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  phone: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional().or(z.literal('')),
  image: z.string().optional(),
  ministry_id: z.string().optional().or(z.literal(''))
});

type ElderFormValues = z.infer<typeof elderFormSchema>;

const ElderManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElder, setSelectedElder] = useState<Elder | null>(null);

  // Setup form
  const form = useForm<ElderFormValues>({
    resolver: zodResolver(elderFormSchema),
    defaultValues: {
      name: "",
      role: "Elder",
      phone: "",
      email: "",
      image: "",
      ministry_id: ""
    }
  });

  // Fetch elders data
  const { data: elders, isLoading, isError } = useQuery({
    queryKey: ['elders'],
    queryFn: getElders
  });

  // Fetch ministries for the dropdown
  const { data: ministries } = useQuery({
    queryKey: ['ministries'],
    queryFn: () => getMinistries()
  });

  // Mutations
  const createElderMutation = useMutation({
    mutationFn: createElder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elders'] });
      toast({
        title: "Success",
        description: "Elder created successfully",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create elder: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateElderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Elder> }) => 
      updateElder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elders'] });
      toast({
        title: "Success",
        description: "Elder updated successfully",
      });
      handleCloseDialog();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update elder: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteElderMutation = useMutation({
    mutationFn: deleteElder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['elders'] });
      toast({
        title: "Success",
        description: "Elder deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete elder: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Reset form when selectedElder changes
  useEffect(() => {
    if (selectedElder) {
      form.reset({
        name: selectedElder.name,
        role: selectedElder.role,
        phone: selectedElder.phone || "",
        email: selectedElder.email || "",
        image: selectedElder.image || "",
        ministry_id: selectedElder.ministry_id || ""
      });
    } else {
      form.reset({
        name: "",
        role: "Elder",
        phone: "",
        email: "",
        image: "",
        ministry_id: ""
      });
    }
  }, [selectedElder, form]);

  const handleAddElder = () => {
    setIsEditing(false);
    setSelectedElder(null);
    setIsDialogOpen(true);
  };

  const handleEditElder = (elder: Elder) => {
    setIsEditing(true);
    setSelectedElder(elder);
    setIsDialogOpen(true);
  };

  const handleDeleteElder = (id: string) => {
    if (window.confirm("Are you sure you want to delete this elder?")) {
      deleteElderMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedElder(null);
    form.reset();
  };

  const onSubmit = (data: ElderFormValues) => {
    // Ensure that required fields are present
    if (!data.name || !data.role) {
      toast({
        title: "Error",
        description: "Name and role are required fields",
        variant: "destructive",
      });
      return;
    }

    // Clean up empty strings to undefined for optional fields
    const formattedData = {
      name: data.name, // required field
      role: data.role, // required field
      email: data.email || undefined,
      phone: data.phone || undefined,
      image: data.image || undefined,
      ministry_id: data.ministry_id || undefined
    };

    if (isEditing && selectedElder) {
      updateElderMutation.mutate({ 
        id: selectedElder.id, 
        data: formattedData 
      });
    } else {
      createElderMutation.mutate(formattedData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading elders...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading elders. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Church Elders</h2>
        <Button onClick={handleAddElder} className="bg-eecfin-navy hover:bg-eecfin-navy/80">
          <Plus className="mr-2 h-4 w-4" />
          Add Elder
        </Button>
      </div>

      {elders && elders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ministry</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elders.map((elder) => (
              <TableRow key={elder.id}>
                <TableCell className="font-medium">{elder.name}</TableCell>
                <TableCell>{elder.role}</TableCell>
                <TableCell>{elder.phone}</TableCell>
                <TableCell>{elder.email}</TableCell>
                <TableCell>{elder.ministries?.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditElder(elder)}
                    className="mr-1"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteElder(elder.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded">
          <p className="text-gray-500">No elders found. Add your first elder.</p>
        </div>
      )}

      {/* Add/Edit Elder Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Elder' : 'Add New Elder'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="Enter email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input placeholder="Enter image URL" {...field} />
                        {field.value && (
                          <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                            <img 
                              src={field.value} 
                              alt="Preview" 
                              className="h-full w-full object-cover" 
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ministry_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ministry</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="">Select a ministry</option>
                        {ministries && ministries.map(ministry => (
                          <option key={ministry.id} value={ministry.id}>
                            {ministry.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCloseDialog}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={form.formState.isSubmitting || createElderMutation.isPending || updateElderMutation.isPending}
                >
                  {(form.formState.isSubmitting || createElderMutation.isPending || updateElderMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? 'Update' : 'Add'} Elder
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ElderManager;
