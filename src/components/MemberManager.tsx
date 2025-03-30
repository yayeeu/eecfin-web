
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
            View all church members and their roles
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
