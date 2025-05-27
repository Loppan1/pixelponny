export type Horse = {
  id: string;
  name: string;
  breed?: string;
  gender?: string;
  height?: number;

  color?: string;
  genotype?: string;

  sire?: string;
  sireRef?: string;
  dam?: string;
  damRef?: string;

  created?: string;
  owner?: string;
  breeder?: string;
  url?: string;
  community?: string;

  achievements?: string[];
};

export type Stable = {
  name: string;
  affix?: string[];
  owner?: string;
  registeredHorses?: string[];
  bredHorses?: string[];
  community?: string;
};
