
import React from 'react';
import { Member } from '@/types/database.types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, User, UserCheck, Activity } from 'lucide-react';

const MemberMetrics: React.FC<{ members: Member[] }> = ({ members }) => {
  // Calculate basic metrics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;
  const inactiveMembers = totalMembers - activeMembers;
  
  // Gender distribution data
  const maleMembers = members.filter(m => m.gender?.toLowerCase() === 'male').length;
  const femaleMembers = members.filter(m => m.gender?.toLowerCase() === 'female').length;
  const otherGenderMembers = totalMembers - maleMembers - femaleMembers; // Includes undefined
  
  const genderData = [
    { name: 'Male', value: maleMembers, fill: '#3b82f6' },
    { name: 'Female', value: femaleMembers, fill: '#ec4899' },
    { name: 'Other/Unspecified', value: otherGenderMembers, fill: '#9ca3af' },
  ].filter(item => item.value > 0);
  
  // Marital status distribution
  const marriedMembers = members.filter(m => m.marital_status?.toLowerCase() === 'married').length;
  const singleMembers = members.filter(m => m.marital_status?.toLowerCase() === 'single').length;
  const otherMaritalMembers = totalMembers - marriedMembers - singleMembers; // Includes undefined
  
  const maritalData = [
    { name: 'Married', value: marriedMembers, fill: '#10b981' },
    { name: 'Single', value: singleMembers, fill: '#6366f1' },
    { name: 'Other/Unspecified', value: otherMaritalMembers, fill: '#9ca3af' },
  ].filter(item => item.value > 0);
  
  // Metrics cards data
  const metrics = [
    { icon: Users, label: 'Total Members', value: totalMembers, color: 'bg-blue-100 text-blue-700' },
    { icon: UserCheck, label: 'Active', value: activeMembers, color: 'bg-green-100 text-green-700' },
    { icon: User, label: 'Inactive', value: inactiveMembers, color: 'bg-gray-100 text-gray-700' },
    { icon: Activity, label: 'Participation Rate', value: `${Math.round((activeMembers / totalMembers) * 100)}%`, color: 'bg-purple-100 text-purple-700' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, i) => (
          <div key={i} className={`rounded-lg p-4 ${metric.color} flex flex-col items-center justify-center text-center`}>
            <metric.icon className="h-8 w-8 mb-2" />
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="text-xs font-medium">{metric.label}</div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-center font-medium mb-2">Gender Distribution</h3>
          <div className="h-[180px]">
            <ChartContainer config={{ male: { label: 'Male' }, female: { label: 'Female' }, other: { label: 'Other/Unspecified' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-center font-medium mb-2">Marital Status</h3>
          <div className="h-[180px]">
            <ChartContainer config={{ married: { label: 'Married' }, single: { label: 'Single' }, other: { label: 'Other/Unspecified' } }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={maritalData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {maritalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberMetrics;
