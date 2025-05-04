
import React from 'react';
import { BellRing, CirclePlay } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface LiveIndicatorProps {
  isLive: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isLive, className = '', size = 'md' }) => {
  if (!isLive) return null;
  
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3'
  };
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  return (
    <Badge 
      variant="destructive" 
      className={`flex items-center gap-1.5 animate-pulse ${textSizeClasses[size]} ${className}`}
    >
      <span className="relative flex">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75 ${sizeClasses[size]}`}></span>
        <span className={`relative inline-flex rounded-full bg-white ${sizeClasses[size]}`}></span>
      </span>
      LIVE
    </Badge>
  );
};

export default LiveIndicator;
