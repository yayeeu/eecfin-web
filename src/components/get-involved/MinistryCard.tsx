import React from 'react';
import { Mail, Phone, User, Church, Users } from 'lucide-react';
import { Ministry } from '@/types/database.types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="p-4 bg-gradient-to-br from-eecfin-navy/5 to-eecfin-gold/10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-eecfin-navy/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-eecfin-navy" />
          </div>
          <div>
            <h3 className="font-semibold text-eecfin-navy leading-tight">{ministry.name}</h3>
            <Badge variant="outline" className="mt-1 text-xs">
             
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="flex-grow p-4">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {ministry.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-700">
            <User className="h-4 w-4 mr-2 text-eecfin-navy flex-shrink-0" />
            <span className="truncate">{ministry.contact_name}</span>
          </div>
          
          {ministry.contact_email && (
            <div className="flex items-center text-gray-700">
              <Mail className="h-4 w-4 mr-2 text-eecfin-navy flex-shrink-0" />
              <a 
                href={`mailto:${ministry.contact_email}`} 
                className="hover:text-eecfin-navy truncate transition-colors"
              >
                {ministry.contact_email}
              </a>
            </div>
          )}
          
          {ministry.contact_phone && (
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2 text-eecfin-navy flex-shrink-0" />
              <a 
                href={`tel:${ministry.contact_phone.replace(/\s+/g, '')}`}
                className="hover:text-eecfin-navy truncate transition-colors"
              >
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
