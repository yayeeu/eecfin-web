
import { useQuery } from '@tanstack/react-query';
import { getMinistries } from '@/lib/ministryService';
import { getMembersForDropdown, getEldersForDropdown } from '@/lib/memberService';

export const useMinistryData = () => {
  const { 
    data: ministries, 
    isLoading: ministriesLoading, 
    error: ministriesError 
  } = useQuery({
    queryKey: ['ministries'],
    queryFn: () => getMinistries(),
  });

  const { 
    data: members, 
    isLoading: membersLoading 
  } = useQuery({
    queryKey: ['members-dropdown'],
    queryFn: () => getMembersForDropdown(),
  });

  const { 
    data: elders, 
    isLoading: eldersLoading 
  } = useQuery({
    queryKey: ['elders-dropdown'],
    queryFn: () => getEldersForDropdown(),
  });

  const isLoading = ministriesLoading || membersLoading || eldersLoading;

  return {
    ministries,
    members,
    elders,
    isLoading,
    ministriesError
  };
};
