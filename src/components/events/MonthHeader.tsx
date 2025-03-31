
import React from 'react';
import { Calendar } from 'lucide-react';

interface MonthHeaderProps {
  monthYear: string;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ monthYear }) => {
  return (
    <h3 className="text-xl font-bold mb-3 text-eecfin-navy flex items-center">
      <Calendar className="mr-2 h-5 w-5" /> {monthYear}
    </h3>
  );
};

export default MonthHeader;
