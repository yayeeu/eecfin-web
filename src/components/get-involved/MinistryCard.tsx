
import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ministry } from '@/types/database.types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {ministry.photo && (
        <div className="w-full h-24 overflow-hidden">
          <img 
            src={ministry.photo} 
            alt={ministry.name}
            className="w-full h-full object-cover"
            loading="lazy" 
          />
        </div>
      )}
      
      <CardContent className="flex-grow p-3">
        <h3 className="text-base font-semibold mb-1 line-clamp-1">{ministry.name}</h3>
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ministry.description}</p>
        
        <div className="space-y-1 text-xs">
          {ministry.contact_elder ? (
            <div className="flex items-start text-gray-700">
              <User className="h-3 w-3 mr-1 mt-0.5 text-eecfin-navy flex-shrink-0" />
              <span className="truncate">{ministry.contact_elder.name}</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-700">
              <User className="h-3 w-3 mr-1 text-eecfin-navy flex-shrink-0" />
              <span className="truncate">{ministry.contact_name}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-700">
            <Mail className="h-3 w-3 mr-1 text-eecfin-navy flex-shrink-0" />
            <a href={`mailto:${ministry.contact_email}`} className="hover:text-eecfin-navy truncate">
              {ministry.contact_email}
            </a>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 p-3">
        <Button className="bg-eecfin-navy hover:bg-eecfin-navy/80 w-full text-xs h-8" size="sm">
          Get Involved
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MinistryCard;
