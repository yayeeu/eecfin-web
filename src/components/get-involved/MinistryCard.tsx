
import React from 'react';
import { Mail, Phone, User, Church } from 'lucide-react';
import { Ministry } from '@/types/database.types';
import { Card, CardContent } from '@/components/ui/card';

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
      <div className="w-full h-40 overflow-hidden bg-gradient-to-br from-eecfin-navy/10 to-eecfin-gold/20 relative">
        {ministry.photo ? (
          <>
            <img 
              src={ministry.photo} 
              alt={ministry.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-eecfin-navy/40 to-transparent"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-eecfin-navy/10 to-eecfin-gold/20 relative">
            <Church className="h-12 w-12 text-eecfin-navy/50" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-bold text-eecfin-navy leading-tight">{ministry.name}</h3>
            </div>
          </div>
        )}
        
        {ministry.photo && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold text-white drop-shadow-lg leading-tight">{ministry.name}</h3>
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow p-6 bg-white">
        {!ministry.photo && (
          <h3 className="text-lg font-bold mb-3 text-eecfin-navy group-hover:text-eecfin-gold transition-colors">
            {ministry.name}
          </h3>
        )}
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {ministry.description}
        </p>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center text-gray-700 group-hover:text-eecfin-navy transition-colors">
            <User className="h-4 w-4 mr-3 text-eecfin-navy flex-shrink-0" />
            <span className="truncate font-medium">{ministry.contact_name}</span>
          </div>
          
          {ministry.contact_email && (
            <div className="flex items-center text-gray-700">
              <Mail className="h-4 w-4 mr-3 text-eecfin-navy flex-shrink-0" />
              <a 
                href={`mailto:${ministry.contact_email}`} 
                className="hover:text-eecfin-gold truncate transition-colors font-medium"
              >
                {ministry.contact_email}
              </a>
            </div>
          )}
          
          {ministry.contact_phone && (
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-3 text-eecfin-navy flex-shrink-0" />
              <a 
                href={`tel:${ministry.contact_phone}`} 
                className="hover:text-eecfin-gold truncate transition-colors font-medium"
              >
                {ministry.contact_phone}
              </a>
            </div>
          )}
        </div>
        
        {/* Community images placeholder for ministries */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-eecfin-navy to-eecfin-gold rounded-full border-2 border-white"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-eecfin-gold to-eecfin-accent rounded-full border-2 border-white"></div>
            <div className="w-6 h-6 bg-gradient-to-br from-eecfin-accent to-eecfin-navy rounded-full border-2 border-white"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-xs text-gray-600 font-medium">+</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Join our community</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MinistryCard;
