
import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Ministry } from '@/types/database.types';
import { Card, CardContent } from '@/components/ui/card';

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="w-full h-32 overflow-hidden bg-gray-100">
        {ministry.photo ? (
          <img 
            src={ministry.photo} 
            alt={ministry.name}
            className="w-full h-full object-cover"
            loading="lazy" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-eecfin-navy/10">
            <span className="text-eecfin-navy text-xl font-semibold">{ministry.name}</span>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow p-3 pt-3">
        <h3 className="text-base font-semibold mb-1 line-clamp-1">{ministry.name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ministry.description}</p>
        
        <div className="space-y-1 text-xs">
          <div className="flex items-center text-gray-700">
            <User className="h-3 w-3 mr-1 text-eecfin-navy flex-shrink-0" />
            <span className="truncate">{ministry.contact_name}</span>
          </div>
          
          {ministry.contact_email && (
            <div className="flex items-center text-gray-700">
              <Mail className="h-3 w-3 mr-1 text-eecfin-navy flex-shrink-0" />
              <a href={`mailto:${ministry.contact_email}`} className="hover:text-eecfin-navy truncate">
                {ministry.contact_email}
              </a>
            </div>
          )}
          
          {ministry.contact_phone && (
            <div className="flex items-center text-gray-700">
              <Phone className="h-3 w-3 mr-1 text-eecfin-navy flex-shrink-0" />
              <a href={`tel:${ministry.contact_phone}`} className="hover:text-eecfin-navy truncate">
                {ministry.contact_phone}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MinistryCard;
