
import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ministry } from '@/lib/ministryService';

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      {ministry.photo && (
        <div className="mb-6 rounded-lg overflow-hidden">
          <img 
            src={ministry.photo} 
            alt={ministry.name}
            className="w-full h-48 object-cover"
            loading="lazy" 
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-3">{ministry.name}</h3>
      <p className="text-gray-600 mb-4">{ministry.description}</p>
      
      <div className="space-y-2 mb-6">
        {ministry.contact_elder ? (
          <>
            <div className="flex items-start text-gray-700">
              <User className="h-4 w-4 mr-2 mt-1 text-eecfin-navy" />
              <div>
                <p className="font-medium">Contact Elder:</p> 
                <p>{ministry.contact_elder.name}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center text-gray-700">
            <User className="h-4 w-4 mr-2 text-eecfin-navy" />
            <span>{ministry.contact_name}</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-700">
          <Mail className="h-4 w-4 mr-2 text-eecfin-navy" />
          <a href={`mailto:${ministry.contact_email}`} className="hover:text-eecfin-navy">
            {ministry.contact_email}
          </a>
        </div>
        
        {ministry.contact_phone && (
          <div className="flex items-center text-gray-700">
            <Phone className="h-4 w-4 mr-2 text-eecfin-navy" />
            <a href={`tel:${ministry.contact_phone}`} className="hover:text-eecfin-navy">
              {ministry.contact_phone}
            </a>
          </div>
        )}
        
        {ministry.contact_elder?.phone && (
          <div className="flex items-center text-gray-700">
            <Phone className="h-4 w-4 mr-2 text-eecfin-navy" />
            <a href={`tel:${ministry.contact_elder.phone}`} className="hover:text-eecfin-navy">
              {ministry.contact_elder.phone}
            </a>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80">
          Get Involved
        </Button>
      </div>
    </div>
  );
};

export default MinistryCard;
