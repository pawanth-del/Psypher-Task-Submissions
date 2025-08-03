export const tierColors = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-blue-200 text-blue-800',
  gold: 'bg-yellow-200 text-yellow-800',
  platinum: 'bg-purple-200 text-purple-800',
} as const;

export const tierOrder = ['free', 'silver', 'gold', 'platinum'] as const;

export type Tier = keyof typeof tierColors;
