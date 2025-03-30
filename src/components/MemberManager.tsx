
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AllMembersList from '@/components/AllMembersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MemberManager: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default MemberManager;
