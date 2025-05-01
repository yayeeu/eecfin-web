
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Ministry, Member } from '@/types/database.types';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';

// Form schema validation
const formSchema = z.object({
  name: z.string().min(1, 'Ministry name is required'),
  description: z.string().min(1, 'Description is required'),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
  contact_phone: z.string().optional(),
  photo: z.string().optional(),
  status: z.enum(['active', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

interface MinistryFormProps {
  ministry: Ministry | null;
  elders: Member[];
  members: Member[];
  selectedMember: Member | null;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  onContactPersonChange: (contactPersonId: string) => void;
}

const MinistryForm: React.FC<MinistryFormProps> = ({
  ministry,
  elders,
  members,
  selectedMember,
  onSubmit,
  onCancel,
  onContactPersonChange
}) => {
  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ministry?.name || '',
      description: ministry?.description || '',
      contact_name: ministry?.contact_name || '',
      contact_email: ministry?.contact_email || '',
      contact_phone: ministry?.contact_phone || '',
      photo: ministry?.photo || '',
      status: (ministry?.status as 'active' | 'inactive') || 'active'
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // When form is submitted
  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If a member is selected, update the contact fields
  useEffect(() => {
    if (selectedMember) {
      // Only update if the contact_name field is empty or we're creating a new ministry
      if (!ministry || !form.getValues('contact_name')) {
        form.setValue('contact_name', selectedMember.name || '');
      }
      
      if (selectedMember.email) {
        form.setValue('contact_email', selectedMember.email);
      }
      
      if (selectedMember.phone) {
        form.setValue('contact_phone', selectedMember.phone || '');
      }
    }
  }, [selectedMember, form, ministry]);

  // Get all contacts (elders + members) for dropdown
  const allContacts = [...elders, ...members].filter(contact => 
    // Filter out duplicates if a member is also an elder
    !elders.some(elder => elder.id === contact.id && members.some(member => member.id === contact.id))
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ministry Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter ministry name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter ministry description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter contact email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter contact phone"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm text-gray-500 mb-2">Optional: Select a member to use their contact information</p>
          <Select
            onValueChange={(value) => onContactPersonChange(value)}
            value={selectedMember?.id}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a contact person" />
            </SelectTrigger>
            <SelectContent>
              <div className="max-h-[300px] overflow-y-auto">
                {allContacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id}>
                    {contact.name} {contact.role === 'elder' ? '(Elder)' : ''}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">Selecting a member will auto-fill contact information</p>
        </div>

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter photo URL"
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                defaultValue={field.value}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {ministry ? 'Update Ministry' : 'Create Ministry'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MinistryForm;
