
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { createContactLog } from '@/lib/contactLogService';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Flag } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ContactLog } from '@/types/database.types';

const formSchema = z.object({
  contact_type: z.string({ required_error: "Contact type is required" }),
  notes: z.string().min(1, "Notes are required"),
  flagged: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactLogFormProps {
  elderId: string;
  memberId: string;
  onSuccess?: () => void;
}

const ContactLogForm: React.FC<ContactLogFormProps> = ({ elderId, memberId, onSuccess }) => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_type: '',
      notes: '',
      flagged: false,
    },
  });
  
  const contactTypes = [
    { value: 'phone', label: 'Phone Call' },
    { value: 'visit', label: 'Home Visit' },
    { value: 'email', label: 'Email' },
    { value: 'text', label: 'Text Message' },
    { value: 'meeting', label: 'In-person Meeting' },
    { value: 'other', label: 'Other' },
  ];
  
  // Update the mutation to accept the correct parameter format
  const mutation = useMutation({
    mutationFn: (params: { id: string; data: FormValues }) => {
      const { id, data } = params;
      return createContactLog(id, {
        elder_id: elderId,
        member_id: memberId,
        contact_type: data.contact_type,
        notes: data.notes,
        flagged: data.flagged,
      });
    },
    onSuccess: () => {
      toast({
        title: "Contact log created",
        description: "The contact log has been successfully created.",
      });
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      console.error('Error creating contact log:', error);
      toast({
        title: "Error",
        description: "There was an error creating the contact log. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: FormValues) => {
    mutation.mutate({ id: memberId, data });
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="contact_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contactTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter details about the contact..."
                  rows={4}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="flagged"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel className="text-base flex items-center">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag for Follow-up
                </FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save Contact Log'}
        </Button>
      </form>
    </Form>
  );
};

export default ContactLogForm;
