
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AllMembersList from '@/components/AllMembersList';
import EldersList from '@/components/EldersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MemberManager: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all-members" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all-members">All Members</TabsTrigger>
          <TabsTrigger value="elders">Elders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-members">
          <Card>
            <CardHeader>
              <CardTitle>All Members</CardTitle>
              <CardDescription>
                View and manage all church members with comprehensive details including personal information, 
                church background, family details, and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AllMembersList />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="elders">
          <Card>
            <CardHeader>
              <CardTitle>Church Elders</CardTitle>
              <CardDescription>
                View and manage church elders. Elders are members with the role 'Elder'.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EldersList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberManager;
