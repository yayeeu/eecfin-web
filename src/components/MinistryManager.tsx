
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMinistries, createMinistry, updateMinistry, deleteMinistry } from '@/lib/ministryService';
import { Ministry } from '@/types/database.types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Pencil, Trash, Plus, Check, X, ImagePlus } from 'lucide-react';
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

const emptyMinistry: Omit<Ministry, 'id' | 'created_at'> = {
  name: '',
  description: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  status: 'active',
  photo: ''
};

const MinistryManager = () => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Partial<Ministry> | null>(null);
  const [formData, setFormData] = useState<Omit<Ministry, 'id' | 'created_at'>>(emptyMinistry);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: ministries, isLoading, error } = useQuery({
    queryKey: ['ministries'],
    queryFn: () => getMinistries(),
  });

  const createMutation = useMutation({
    mutationFn: createMinistry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
      toast.success('Ministry added successfully');
      setShowDialog(false);
      setFormData(emptyMinistry);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      status: value as 'active' | 'inactive' 
    }));
  };

  const handleAddMinistry = () => {
    setFormData(emptyMinistry);
    setEditingMinistry(null);
    setShowDialog(true);
  };

  const handleEditMinistry = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      name: ministry.name,
      description: ministry.description,
      contact_name: ministry.contact_name,
      contact_email: ministry.contact_email,
      contact_phone: ministry.contact_phone || '',
      status: ministry.status,
      photo: ministry.photo || ''
    });
    setShowDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.contact_name || !formData.contact_email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingMinistry?.id) {
      updateMutation.mutate({ 
        id: editingMinistry.id, 
        ministry: formData 
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading ministries...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading ministries: {error.message}</div>;
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
          {ministries.map((ministry) => (
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
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">{ministry.description}</p>
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
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No ministries found. Click 'Add Ministry' to create one.</p>
        </div>
      )}

      {/* Add/Edit Ministry Dialog */}
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Ministry Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter ministry name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter ministry description"
                  rows={4}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_name">Contact Person *</Label>
                <Input
                  id="contact_name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  placeholder="Enter contact person name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_email">Contact Email *</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  placeholder="Enter contact email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  placeholder="Enter contact phone number (optional)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  placeholder="Enter photo URL (optional)"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status *</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ministry status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-eecfin-navy">
                {editingMinistry ? 'Update Ministry' : 'Add Ministry'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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
