import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContactLogs, deleteContactLog } from '@/lib/contactLogService';
import { ContactLog } from '@/types/database.types';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, AlertTriangle, MessageSquare, Phone, Mail, UserPlus, HelpCircle } from 'lucide-react';
import ContactLogForm from './ContactLogForm';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactLogListProps {
  elderId?: string;
  memberId?: string;
  showContactButtons?: boolean;
}

const ContactLogList: React.FC<ContactLogListProps> = ({ 
  elderId, 
  memberId,
  showContactButtons = true
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedLog, setSelectedLog] = useState<ContactLog | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data: logs, isLoading, isError } = useQuery({
    queryKey: ['contact-logs', { elderId, memberId }],
    queryFn: () => getContactLogs({ elderId, memberId })
  });

  const deleteMutation = useMutation({
    mutationFn: deleteContactLog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-logs'] });
      toast({
        title: 'Contact log deleted',
        description: 'The contact log has been deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to delete contact log: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact log?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (log: ContactLog) => {
    setSelectedLog(log);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedLog(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedLog(null);
  };

  const getContactTypeIcon = (type: ContactLog['contact_type']) => {
    switch (type) {
      case 'Text Message':
        return <MessageSquare className="h-4 w-4" />;
      case 'Phone Call':
        return <Phone className="h-4 w-4" />;
      case 'In Person':
        return <UserPlus className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      default:
        return <HelpCircle className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading contact logs</div>;
  }

  return (
    <>
      <div className="space-y-4">
        {showContactButtons && (
          <div className="flex space-x-2 mb-4">
            <Button onClick={handleAddNew}>Add New Contact Log</Button>
          </div>
        )}

        {logs && logs.length > 0 ? (
          logs.map((log) => (
            <Card key={log.id} className={log.flagged ? 'border-yellow-500' : ''}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center space-x-2">
                      {getContactTypeIcon(log.contact_type)}
                      <span>{log.contact_type}</span>
                      {log.flagged && (
                        <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Flagged
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {log.elder?.name && log.member?.name ? (
                        <>Elder {log.elder.name} contacted {log.member.name}</>
                      ) : (
                        <>Contact record</>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(log)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(log.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {log.notes ? (
                  <p className="text-sm whitespace-pre-line">{log.notes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No notes provided</p>
                )}
              </CardContent>
              <CardFooter className="pt-0 text-xs text-muted-foreground">
                {log.created_at && (
                  <span>
                    {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                  </span>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded">
            <p className="text-gray-500">No contact logs found</p>
            {showContactButtons && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleAddNew}
              >
                Add First Contact Log
              </Button>
            )}
          </div>
        )}
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedLog ? 'Edit Contact Log' : 'Add New Contact Log'}
            </DialogTitle>
          </DialogHeader>
          
          {(elderId && memberId) && (
            <ContactLogForm
              elderId={elderId}
              memberId={memberId}
              initialData={selectedLog || undefined}
              onSuccess={closeForm}
              onCancel={closeForm}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactLogList;
