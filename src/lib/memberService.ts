
// Re-export all member services from their respective files
export {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
} from '@/lib/services/memberBasicService';

// Elder functions removed - use apiService.getElders() directly from '@/lib/api'
// These were helper functions that have been removed to match abalatv2 architecture

export {
  assignElderToMember,
  removeElderAssignment,
  getElderAssignment,
  getMembersByElderId
} from '@/lib/services/elderAssignmentService';

export {
  getMembersForDropdown
} from '@/lib/services/memberDropdownService';

export {
  getMemberMinistries,
  assignMinistryToMember,
  removeMinistryFromMember,
  getMembersByMinistryId
} from '@/lib/services/memberMinistryService';
