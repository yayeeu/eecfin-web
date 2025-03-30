
import React, { useState } from 'react';
import { Ministry, Member } from '@/types/database.types';
import { Button } from "./ui/button";
import { Plus } from 'lucide-react';
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MinistryForm from './ministry/MinistryForm';
import MinistryList from './ministry/MinistryList';
import DeleteConfirmDialog from './ministry/DeleteConfirmDialog';
import { useMinistryData } from './ministry/hooks/useMinistryData';
import { useMinistryMutations } from './ministry/hooks/useMinistryMutations';
import { z } from 'zod';
import { toast } from 'sonner';

// Form schema from the original component
const formSchema = z.object({
  name: z.string().min(1, 'Ministry name is required'),
  description: z.string().min(1, 'Description is required'),
  contact_person_id: z.string().min(1, 'Contact person is required'),
  contact_email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  photo: z.string().optional(),
  status: z.enum(['active', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

const MinistryManager = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { ministries, members, elders, isLoading, ministriesError } = useMinistryData();
  const { createMutation, updateMutation, deleteMutation } = useMinistryMutations();

  const handleAddMinistry = () => {
    setEditingMinistry(null);
    setSelectedMember(null);
    setShowDialog(true);
  };

  const handleEditMinistry = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    
    const contactPerson = ministry.contact_person_id ? 
      elders?.find(e => e.id === ministry.contact_person_id) || 
      members?.find(m => m.id === ministry.contact_person_id) : 
      null;
    
    setSelectedMember(contactPerson || null);
    setShowDialog(true);
  };

  const handleSubmit = (values: FormValues) => {
    const selectedMember = elders?.find(e => e.id === values.contact_person_id) || 
                           members?.find(m => m.id === values.contact_person_id);
    
    if (!selectedMember) {
      toast.error("Selected contact person not found");
      return;
    }

    const ministryData = {
      ...values,
      contact_name: selectedMember.name || '',
      contact_email: values.contact_email, // Use the email from the form
      contact_phone: selectedMember.phone || ''
    };

    console.log("Submitting ministry data:", ministryData);

    if (editingMinistry?.id) {
      updateMutation.mutate({ 
        id: editingMinistry.id, 
        ministry: ministryData 
      });
    } else {
      createMutation.mutate(ministryData as any);
    }
    
    setShowDialog(false);
  };

  const handleContactPersonChange = (contactPersonId: string) => {
    const elder = elders?.find(e => e.id === contactPersonId);
    const member = members?.find(m => m.id === contactPersonId);
    setSelectedMember(elder || member || null);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirm(id);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteMutation.mutate(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setEditingMinistry(null);
  };

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

      <MinistryList 
        ministries={ministries || []}
        members={members}
        elders={elders}
        onEdit={handleEditMinistry}
        onDelete={handleDeleteClick}
      />

      {/* Dialog for adding/editing ministry */}
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
          
          <MinistryForm 
            ministry={editingMinistry}
            elders={elders || []}
            members={members || []}
            onSubmit={handleSubmit}
            onCancel={handleDialogClose}
            onContactPersonChange={handleContactPersonChange}
            selectedMember={selectedMember}
          />
        </DialogContent>
      </Dialog>

      {/* Alert dialog for delete confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DeleteConfirmDialog
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </AlertDialog>
    </div>
  );
};

export default MinistryManager;
