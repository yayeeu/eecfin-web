
import React from 'react';
import { Ministry, Member } from '@/types/database.types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Edit, Trash } from 'lucide-react';

interface MinistryCardProps {
  ministry: Ministry;
  contactPerson: Member | null;
  contactElder: Member | null;
  onEdit: (ministry: Ministry) => void;
  onDelete: (id: string) => void;
}

const MinistryCard: React.FC<MinistryCardProps> = ({
  ministry,
  contactPerson,
  contactElder,
  onEdit,
  onDelete
}) => {
  // Display contact person from either direct ministry data or from relations
  const displayContact = contactPerson || contactElder;
  const contactName = ministry.contact_name || displayContact?.name || 'No contact assigned';
  const contactEmail = ministry.contact_email || displayContact?.email || '';
  const contactPhone = ministry.contact_phone || displayContact?.phone || '';

  return (
    <Card className="flex flex-col h-full">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold line-clamp-2">{ministry.name}</h3>
          <Badge variant={ministry.status === 'active' ? 'default' : 'outline'}>
            {ministry.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{ministry.description}</p>
        
        <div className="mt-4">
          <p className="text-sm font-medium">Contact Person:</p>
          <p className="text-sm">{contactName}</p>
          
          {contactEmail && (
            <div className="flex items-center mt-2 text-sm">
              <Mail className="h-4 w-4 mr-1.5 text-gray-500" />
              <a 
                href={`mailto:${contactEmail}`} 
                className="text-eecfin-navy hover:underline"
              >
                {contactEmail}
              </a>
            </div>
          )}
          
          {contactPhone && (
            <div className="flex items-center mt-1 text-sm">
              <Phone className="h-4 w-4 mr-1.5 text-gray-500" />
              <a 
                href={`tel:${contactPhone.replace(/\s+/g, '')}`}
                className="text-eecfin-navy hover:underline"
              >
                {contactPhone}
              </a>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button
          variant="outline" 
          size="sm"
          onClick={() => onEdit(ministry)}
        >
          <Edit className="h-4 w-4 mr-1.5" />
          Edit
        </Button>
        <Button
          variant="outline" 
          size="sm"
          onClick={() => onDelete(ministry.id)}
          className="text-red-600"
        >
          <Trash className="h-4 w-4 mr-1.5" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MinistryCard;
