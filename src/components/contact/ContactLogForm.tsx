
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createContactLog } from '@/lib/contactLogService';
import { useToast } from '@/hooks/use-toast';
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
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { ContactLog } from '@/types/database.types';

const formSchema = z.object({
  contact_type: z.enum(['Text Message', 'In Person', 'Phone Call', 'Email', 'Other'], {
    required_error: "Please select a contact type",
  }),
  notes: z.string().optional(),
  flagged: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactLogFormProps {
  elderId: string;
  memberId: string;
  onSuccess?: () => void;
}

const ContactLogForm: React.FC<ContactLogFormProps> = ({
  elderId,
  memberId,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact_type: undefined,
      notes: '',
      flagged: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const newLog: Omit<ContactLog, 'id' | 'created_at' | 'updated_at'> = {
        elder_id: elderId,
        member_id: memberId,
        contact_type: values.contact_type,
        notes: values.notes,
        flagged: values.flagged,
      };
      
      await createContactLog(newLog);
      
      toast({
        title: 'Contact logged',
        description: 'The contact has been successfully recorded',
      });
      
      form.reset({
        contact_type: undefined,
        notes: '',
        flagged: false,
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating contact log:', error);
      toast({
        title: 'Error',
        description: 'Failed to log contact. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact type" />
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
          name="flagged"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Flag for follow-up</FormLabel>
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
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Log Contact'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactLogForm;
