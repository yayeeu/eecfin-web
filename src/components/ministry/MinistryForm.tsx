
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
  contact_person_id: z.string().min(1, 'Contact person is required'),
  contact_email: z.string().email('Please enter a valid email address').min(1, 'Email is required'),
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
      contact_person_id: ministry?.contact_person_id || '',
      contact_email: ministry?.contact_email || '',
      photo: ministry?.photo || '',
      status: (ministry?.status as 'active' | 'inactive') || 'active'
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get all contacts (elders + members) for dropdown
  const allContacts = [...elders, ...members].filter(contact => 
    // Filter out duplicates if a member is also an elder
    !elders.some(elder => elder.id === contact.id && members.some(member => member.id === contact.id))
  );

  // When form is submitted
  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update contact email when contact person changes
  const handleContactPersonChange = (contactPersonId: string) => {
    onContactPersonChange(contactPersonId);
    
    // Find the selected contact and update the email field if available
    const selectedContact = allContacts.find(contact => contact.id === contactPersonId);
    if (selectedContact?.email) {
      form.setValue('contact_email', selectedContact.email);
    }
  };

  // Update form when selected member changes
  useEffect(() => {
    if (selectedMember?.email) {
      form.setValue('contact_email', selectedMember.email);
    }
  }, [selectedMember, form]);

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
          name="contact_person_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleContactPersonChange(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact person" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="max-h-[300px] overflow-y-auto">
                    {allContacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name} {contact.role_id === '1' ? '(Elder)' : ''}
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
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
