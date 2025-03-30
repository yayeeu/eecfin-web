
import React from 'react';
import { Ministry, Member } from '@/types/database.types';
import MinistryCard from './MinistryCard';

interface MinistryListProps {
  ministries: Ministry[];
  members: Member[] | undefined;
  elders: Member[] | undefined;
  onEdit: (ministry: Ministry) => void;
  onDelete: (id: string) => void;
}

const MinistryList: React.FC<MinistryListProps> = ({
  ministries,
  members,
  elders,
  onEdit,
  onDelete
}) => {
  if (!ministries || ministries.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No ministries found. Click 'Add Ministry' to create one.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ministries.map((ministry) => {
        const contactPerson = members?.find(m => m.id === ministry.contact_person_id) || null;
        const contactElder = elders?.find(e => e.id === ministry.contact_person_id) || null;
        
        return (
          <MinistryCard
            key={ministry.id}
            ministry={ministry}
            contactElder={contactElder}
            contactPerson={contactPerson}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default MinistryList;
