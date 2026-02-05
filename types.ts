
export enum Industry {
  FOOD = 'Food Import',
  FASHION = 'Fashion & Textile',
  PET_FOOD = 'Pet Food',
  COSMETICS = 'Cosmetics',
  PHARMA = 'Pharmaceutical'
}

export interface AgentAction {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  details: string;
  result?: any;
  icon: string;
}

export interface TransactionStep {
  id: number;
  label: string;
  description: string;
  agentId?: string;
}

export interface IndustryConfig {
  icon: string;
  marketSize: string;
  color: string;
  problem: string;
  solution: string[];
}
