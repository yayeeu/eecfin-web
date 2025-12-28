
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Member } from '@/types/database.types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Loader2, Phone, Mail, MapPin, Calendar, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ElderManager = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const { data: eldersResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['elders'],
    queryFn: async () => {
      const response = await apiService.getElders();
      if (response.error) throw new Error(response.error);
      const elders = (response.data?.elders || [])
        .filter(elder => elder.eldership_status === 'active')
        .map(elder => ({
          id: elder.member_id,
          name: elder.member_name || 'Unknown',
          email: elder.member_email || '',
          phone: elder.member_phone || '',
          role: 'elder' as const,
          status: 'active' as const,
          created_at: elder.created_at,
          updated_at: elder.updated_at,
          address: '',
          image: elder.member_image || '',
        } as Member))
        .sort((a, b) => a.name.localeCompare(b.name));
      return elders;
    }
  });
  
  const elders = eldersResponse || [];

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshed",
      description: "Elder data has been refreshed",
    });
  };

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
        <Button onClick={handleRefresh} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Church Elders</h2>
          <p className="text-muted-foreground">View and manage church elders</p>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue="grid" className="w-auto" onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elders?.map((elder) => (
            <Card key={elder.id} className="overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    {elder.image ? (
                      <AvatarImage src={elder.image} alt={elder.name || ''} />
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

                <div className="mt-4 flex gap-2">
                  <Badge variant="outline" className="bg-eecfin-gold/10">
                    Elder
                  </Badge>
                  {elder.ministry_id && (
                    <Badge variant="outline" className="bg-eecfin-navy/10">
                      Ministry Lead
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Elders</CardTitle>
            <CardDescription>Complete list of church elders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {elders?.map((elder) => (
                    <tr key={elder.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {elder.image ? (
                              <AvatarImage src={elder.image} alt={elder.name || ''} />
                            ) : (
                              <AvatarFallback className="bg-eecfin-navy text-white text-sm">
                                {elder.name?.charAt(0)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="font-medium">{elder.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{elder.email}</td>
                      <td className="py-3 px-4">{elder.phone}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElderManager;
