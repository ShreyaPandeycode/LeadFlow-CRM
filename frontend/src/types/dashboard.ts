export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualified: number;
  proposal: number;
  won: number;
  lost: number;
  activeMembers: number;
  conversionRate: number;
}

export interface Lead {
  id: number;
  name: string;
  company: string;
  priority: string;
  status: string;
}

export interface Performer {
  assignedTo: number;
  totalLeads: number;
}