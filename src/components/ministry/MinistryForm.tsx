
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Ministry, Member } from '@/types/database.types';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DialogFooter,
} from '@/components/ui/dialog';

const formSchema = z.object({
  name: z.string().min(1, 'Ministry name is required'),
  description: z.string().min(1, 'Description is required'),
  contact_person_id: z.string().min(1, 'Contact person is required'),
  contact_phone: z.string().optional(),
  photo: z.string().optional(),
  status: z.enum(['active', 'inactive'])
});

type FormValues = z.infer<typeof formSchema>;

interface MinistryFormProps {
  ministry: Ministry | null;
  elders: Member[];
  members: Member[];
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  onContactPersonChange: (contactPersonId: string) => void;
  selectedMember: Member | null;
}

const MinistryForm: React.FC<MinistryFormProps> = ({
  ministry,
  elders,
  members,
  onSubmit,
  onCancel,
  onContactPersonChange,
  selectedMember
}) => {
  const emptyMinistry: Omit<Ministry, 'id' | 'created_at' | 'contact_name' | 'contact_email'> = {
    name: '',
    description: '',
    contact_person_id: '',
    contact_phone: '',
    status: 'active',
    photo: ''
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: ministry ? {
      name: ministry.name,
      description: ministry.description,
      contact_person_id: ministry.contact_person_id || '',
      contact_phone: ministry.contact_phone || '',
      status: ministry.status,
      photo: ministry.photo || ''
    } : emptyMinistry
  });

  const activeMembers = members?.filter(member => member.status === 'active') || [];
  const activeElders = elders || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  onValueChange={onContactPersonChange}
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-eecfin-navy">
            {ministry ? 'Update Ministry' : 'Add Ministry'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MinistryForm;
