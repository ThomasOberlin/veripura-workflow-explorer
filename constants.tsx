
import { Industry, IndustryConfig } from './types';

export const INDUSTRIES: Record<Industry, IndustryConfig> = {
  [Industry.FOOD]: {
    icon: '🌾',
    marketSize: '$296B',
    color: 'emerald',
    problem: 'Traceability takes 7-14 days. 15-20% border rejection rate.',
    solution: ['AI validates pesticide levels', 'IOTA DID verifies organic credentials', 'Real-time farm-to-shelf tracking']
  },
  [Industry.FASHION]: {
    icon: '👔',
    marketSize: '$95B',
    color: 'emerald',
    problem: '7-tier supply chains lead to greenwashing and labor risks.',
    solution: ['IOTA Hierarchies mapping', 'Chemical compliance (REACH)', 'Digital Passports for sustainability']
  },
  [Industry.PET_FOOD]: {
    icon: '🐾',
    marketSize: '$28-33B',
    color: 'emerald',
    problem: 'Salmonella zero tolerance and ingredient sourcing opacity.',
    solution: ['BSE-free sourcing via DIDs', 'Nutritional profile validation', 'Ingredient provenance']
  },
  [Industry.COSMETICS]: {
    icon: '💄',
    marketSize: '$17-18B',
    color: 'emerald',
    problem: '1,600+ prohibited substances. 12-month wait for safety assessors.',
    solution: ['Auto-validation of ingredients', 'Safety Assessor Marketplace', 'EU CPNP integration']
  },
  [Industry.PHARMA]: {
    icon: '💊',
    marketSize: '$325B',
    color: 'emerald',
    problem: '10% counterfeit rate. Temperature excursions cost $500k/batch.',
    solution: ['API-to-patient traceability', 'IoT feeless temperature monitoring', 'QP network integration']
  }
};

export const STEPS = [
  { id: 1, label: 'Intake', description: 'Product Classification' },
  { id: 2, label: 'Mapping', description: 'Regulatory Requirements' },
  { id: 3, label: 'Extraction', description: 'AI Document Parsing' },
  { id: 4, label: 'Validation', description: 'Rules & Compliance Check' },
  { id: 5, label: 'Audit', description: 'Anomaly Detection' },
  { id: 6, label: 'Notarization', description: 'IOTA Blockchain Entry' }
];
