
import React from 'react';
import { Member } from '@/types/database.types';
import { Users, User, UserCheck, Baby } from 'lucide-react';

const MemberMetrics: React.FC<{ members: Member[] }> = ({ members }) => {
  // Calculate basic metrics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const inactiveMembers = totalMembers - activeMembers;
  
  // Calculate total children for active members
  const totalChildren = members
    .filter(m => m.status === 'active')
    .reduce((sum, member) => sum + (member.num_children || 0), 0);
  
  // Metrics cards data
  const metrics = [
    { icon: Users, label: 'Total Members', value: totalMembers, color: 'bg-blue-100 text-blue-700' },
    { icon: UserCheck, label: 'Active', value: activeMembers, color: 'bg-green-100 text-green-700' },
    { icon: User, label: 'Inactive', value: inactiveMembers, color: 'bg-gray-100 text-gray-700' },
    { icon: Baby, label: 'Children', value: totalChildren, color: 'bg-purple-100 text-purple-700' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className={`rounded-lg p-4 ${metric.color} flex flex-col items-center justify-center text-center`}>
            <metric.icon className="h-8 w-8 mb-2" />
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="text-xs font-medium">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberMetrics;
