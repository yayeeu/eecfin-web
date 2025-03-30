
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ContactLog } from '@/types/database.types';
import { createContactLog, updateContactLog } from '@/lib/contactLogService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const contactLogSchema = z.object({
  contact_type: z.enum(['Text Message', 'In Person', 'Phone Call', 'Email', 'Other'], {
    required_error: 'Please select a contact type.',
  }),
  notes: z.string().optional(),
  flagged: z.boolean().default(false),
});

type ContactLogFormValues = z.infer<typeof contactLogSchema>;

interface ContactLogFormProps {
  elderId: string;
  memberId: string;
  initialData?: ContactLog;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ContactLogForm: React.FC<ContactLogFormProps> = ({ 
  elderId, 
  memberId, 
  initialData, 
  onSuccess, 
  onCancel 
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!initialData;
  
  const form = useForm<ContactLogFormValues>({
    resolver: zodResolver(contactLogSchema),
    defaultValues: {
      contact_type: initialData?.contact_type || 'In Person',
      notes: initialData?.notes || '',
      flagged: initialData?.flagged || false,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: ContactLogFormValues) => 
      createContactLog({
        ...data,
        elder_id: elderId,
        member_id: memberId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-logs'] });
      toast({
        title: 'Contact log created',
        description: 'The contact log has been created successfully.',
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create contact log: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: ContactLogFormValues) => 
      updateContactLog(initialData!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-logs'] });
      toast({
        title: 'Contact log updated',
        description: 'The contact log has been updated successfully.',
      });
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update contact log: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const onSubmit = (data: ContactLogFormValues) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

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
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Text Message">Text Message</SelectItem>
                  <SelectItem value="In Person">In Person</SelectItem>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
                  placeholder="Enter notes about the contact" 
                  {...field} 
                  disabled={isPending}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="flagged"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Flag for follow-up</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Check this if the contact requires additional attention or follow-up
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditing ? 'Update' : 'Save'} Contact Log
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactLogForm;
