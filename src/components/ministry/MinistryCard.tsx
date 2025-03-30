
import React from 'react';
import { Ministry, Member } from '@/types/database.types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Pencil, Trash, User, Phone, Mail } from 'lucide-react';

interface MinistryCardProps {
  ministry: Ministry;
  contactElder: Member | null;
  contactPerson: Member | null;
  onEdit: (ministry: Ministry) => void;
  onDelete: (id: string) => void;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ 
  ministry, 
  contactElder, 
  contactPerson, 
  onEdit, 
  onDelete 
}) => {
  const isElder = !!contactElder;
  
  return (
    <Card key={ministry.id} className="overflow-hidden">
      {ministry.photo ? (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={ministry.photo} 
            alt={ministry.name} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
          <ImagePlus className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{ministry.name}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${
            ministry.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {ministry.status}
          </span>
        </div>
        <CardDescription>
          Contact: {ministry.contact_name}
          {(contactPerson || contactElder) && (
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <User className="h-3 w-3 mr-1" />
              <span>{isElder ? 'Contact Elder' : 'Member'}: {isElder ? contactElder!.name : contactPerson!.name}</span>
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{ministry.description}</p>
        
        {contactElder && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-3 w-3 mr-2" />
              <a href={`tel:${contactElder.phone}`} className="hover:text-eecfin-gold">
                {contactElder.phone}
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-3 w-3 mr-2" />
              <a href={`mailto:${contactElder.email}`} className="hover:text-eecfin-gold">
                {contactElder.email}
              </a>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(ministry)}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(ministry.id)}
        >
          <Trash className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MinistryCard;
