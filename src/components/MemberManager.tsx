
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AllMembersList from '@/components/AllMembersList';
import EldersList from '@/components/EldersList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberContactLogs from '@/components/members/MemberContactLogs';
import MyMembersList from '@/components/MyMembersList';
import { useAuth, UserRole } from '@/contexts/AuthContext';

const MemberManager: React.FC = () => {
  const { toast } = useToast();
  const { userProfile, userRole } = useAuth();
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const handleMemberSelect = (memberId: string) => {
    setSelectedMemberId(memberId);
  };

  const isElder = userRole === 'elder';
  const isAdmin = userRole === 'admin';

  // Determine which tabs to show based on the user's role
  const tabs = [
    { id: 'all-members', label: 'All Members', roles: ['admin', 'elder'] },
    { id: 'my-members', label: 'My Members', roles: ['admin', 'elder'] },
    { id: 'elders', label: 'Elders', roles: ['admin'] },
    { id: 'contact-logs', label: 'Contact Logs', roles: ['admin', 'elder'], disabled: !selectedMemberId },
  ].filter(tab => {
    // Admin can see everything, elders see specific tabs
    if (userRole === 'admin') return true;
    return tab.roles.includes(userRole as UserRole);
  });

  // Determine default tab based on the user's role
  const defaultTab = isElder ? 'my-members' : 'all-members';

  return (
    <div className="space-y-6">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className={`grid w-full ${tabs.length === 4 ? 'grid-cols-4' : `grid-cols-${tabs.length}`}`}>
          {tabs.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id} 
              disabled={tab.disabled}
            >
              {tab.label} {tab.id === 'contact-logs' && selectedMemberId ? '(Selected Member)' : ''}
            </TabsTrigger>
          ))}
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
              <AllMembersList 
                onMemberSelect={handleMemberSelect}
                readOnly={isElder} // Elders can only view, not edit
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-members">
          <Card>
            <CardHeader>
              <CardTitle>My Assigned Members</CardTitle>
              <CardDescription>
                View and manage members that are assigned to you. You can track interactions and add contact logs for these members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MyMembersList onMemberSelect={handleMemberSelect} />
            </CardContent>
          </Card>
        </TabsContent>
        
        {isAdmin && (
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
        )}

        <TabsContent value="contact-logs">
          <Card>
            <CardHeader>
              <CardTitle>Member Contact Logs</CardTitle>
              <CardDescription>
                View and manage contact logs between elders and members. Track different types of interactions and flag items that need follow-up.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedMemberId ? (
                <MemberContactLogs 
                  memberId={selectedMemberId}
                />
              ) : (
                <div className="text-center py-8">
                  <p>Please select a member from the All Members tab to view their contact logs.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberManager;
