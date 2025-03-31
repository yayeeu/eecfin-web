
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getElders } from '@/lib/elderService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Phone, Mail } from 'lucide-react';

const ElderManager = () => {
  const { data: elders, isLoading, error } = useQuery({
    queryKey: ['elders'],
    queryFn: getElders,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading elders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">Error loading elders: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Church Elders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elders.map((elder) => (
              <Card key={elder.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      {elder.image ? (
                        <AvatarImage src={elder.image} alt={elder.name} />
                      ) : (
                        <AvatarFallback className="bg-eecfin-navy text-white text-xl">
                          {elder.name?.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold">{elder.name}</h3>
                      <p className="text-sm text-eecfin-navy font-medium">Elder</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {elder.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a 
                          href={`tel:${elder.phone.replace(/\s+/g, '')}`} 
                          className="text-gray-600 hover:text-eecfin-gold"
                        >
                          {elder.phone}
                        </a>
                      </div>
                    )}
                    
                    {elder.email && (
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <a 
                          href={`mailto:${elder.email}`} 
                          className="text-gray-600 hover:text-eecfin-gold"
                        >
                          {elder.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElderManager;
