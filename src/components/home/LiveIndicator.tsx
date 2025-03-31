
import React from 'react';
import { BellRing, CirclePlay } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isLive, className = '' }) => {
  if (!isLive) return null;
  
  return (
    <Badge 
      variant="destructive" 
      className={`flex items-center gap-1 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      LIVE
    </Badge>
  );
};

export default LiveIndicator;
