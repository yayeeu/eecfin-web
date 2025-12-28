
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMembers } from '@/lib/memberService';
import { apiService } from '@/lib/api';
import { Member } from '@/types/database.types';
import MembersMap from './dashboard/MembersMap';
import MemberMetrics from './dashboard/MemberMetrics';
import MinistryStats from './dashboard/MinistryStats';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: members, isLoading: membersLoading } = useQuery({
    queryKey: ['members'],
    queryFn: getAllMembers
  });

  const { data: eldersResponse, isLoading: eldersLoading } = useQuery({
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

  const { data: ministriesResponse, isLoading: ministriesLoading } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const response = await apiService.getMinistries();
      if (response.error) throw new Error(response.error);
      const ministries = (response.data?.ministries || [])
        .filter(m => m.status === 'active' && m.is_active !== false)
        .sort((a, b) => a.name.localeCompare(b.name));
      return ministries;
    }
  });
  
  const ministries = ministriesResponse || [];

  const isLoading = membersLoading || eldersLoading || ministriesLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-eecfin-navy" />
        <span className="ml-2">Loading dashboard data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Membership Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <MemberMetrics members={members || []} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Ministry Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <MinistryStats 
              ministries={ministries || []} 
              members={members || []} 
              elders={elders || []} 
            />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Members Map</CardTitle>
        </CardHeader>
        <CardContent>
          <MembersMap members={members || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
