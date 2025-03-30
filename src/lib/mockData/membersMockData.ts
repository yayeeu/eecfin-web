
import { Member, MemberUnderElder } from '@/types/database.types';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development mode
export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Yeteshawork Berhanu',
    phone: '+358 41 522 58 89',
    email: 'yeteshawork@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Bruke Wolde',
    phone: '+358 451682997',
    email: 'bruke@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Hizekiel Daniel',
    phone: '+358 449869685',
    email: 'hizekiel@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mekbib Tekle',
    phone: '+358 44 08 22 798',
    email: 'mekbib@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Tamirat Teshome',
    phone: '+358 443514051',
    email: 'tamirat@example.com',
    role: 'Elder',
    role_id: '1',
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'John Doe',
    phone: '+358 45 123 4567',
    email: 'john@example.com',
    role: 'Member',
    role_id: '2',
    status: 'active',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    name: 'Jane Smith',
    phone: '+358 44 765 4321',
    email: 'jane@example.com',
    role: 'Volunteer',
    role_id: '4',
    status: 'inactive',
    created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
  },
];

// Mock data for elder assignments
export const mockElderAssignments: MemberUnderElder[] = [
  {
    id: '1',
    member_id: '6',
    elder_id: '1',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    member_id: '7',
    elder_id: '2',
    created_at: new Date().toISOString()
  }
];
