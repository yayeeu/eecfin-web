
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { createContactLog, updateContactLog } from '@/lib/contactLogService';
import { ContactLog } from '@/types/database.types';
import { Loader2 } from 'lucide-react';

export interface ContactLogFormProps {
  elderId: string;
  memberId: string;
  initialData?: ContactLog;
  onSuccess: () => void;
  onCancel: () => void;
}

type FormValues = {
  contact_type: 'Text Message' | 'In Person' | 'Phone Call' | 'Email' | 'Other';
  notes?: string;
  flagged: boolean;
};

const ContactLogForm: React.FC<ContactLogFormProps> = ({
  elderId,
  memberId,
  initialData,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    defaultValues: {
      contact_type: initialData?.contact_type || 'Phone Call',
      notes: initialData?.notes || '',
      flagged: initialData?.flagged || false,
    },
  });

  const createMutation = useMutation({
    mutationFn: createContactLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-logs'] });
      toast({
        title: 'Contact log created',
        description: 'The contact log has been created successfully.',
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to create contact log: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateContactLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-logs'] });
      toast({
        title: 'Contact log updated',
        description: 'The contact log has been updated successfully.',
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update contact log: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (values: FormValues) => {
    if (initialData?.id) {
      updateMutation.mutate({
        id: initialData.id,
        data: values,
      });
    } else {
      createMutation.mutate({
        elder_id: elderId,
        member_id: memberId,
        ...values,
      });
    }
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
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Phone Call">Phone Call</SelectItem>
                  <SelectItem value="Text Message">Text Message</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="In Person">In Person</SelectItem>
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
                  placeholder="Enter details about the contact here..."
                  disabled={isPending}
                  {...field}
                  value={field.value || ''}
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
                <FormLabel>
                  Flag for follow-up
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update' : 'Create'} Contact Log
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactLogForm;
