export type ChhathDay = 'nahay-khay' | 'kharna' | 'sandhya-arghya' | 'usha-arghya';

export type Language = 'hi' | 'bho' | 'en';

export interface FloatingDiya {
  id: string;
  name: string;
  location: string;
  wish: string;
  x: number;
  z: number;
  color: string;
  timestamp: number;
}

export interface SamagriItem {
  id: string;
  name: {
    en: string;
    hi: string;
    bho: string;
  };
  category: string;
  significance: {
    en: string;
    hi: string;
    bho: string;
  };
  icon: string;
  placed?: boolean;
}

export type KafilaRole = 'dholak_player' | 'singer_auntie' | 'sugarcane_kid' | 'incense_dadi' | 'kalash_sister' | 'villager';

export interface KafilaMember {
  id: string;
  role: KafilaRole;
  x: number;
  z: number;
  color: string;
  offsetDistance: number;
  offsetAngle: number;
  heldItem: string;
}

export interface VillagerNPC {
  id: string;
  name: string;
  x: number;
  z: number;
  role: KafilaRole;
  dialog: string;
  recruited: boolean;
  color: string;
}

export interface CollectibleItem {
  id: string;
  type: 'thekua' | 'coconut' | 'dabh' | 'turmeric' | 'sugarcane';
  name: string;
  x: number;
  z: number;
  collected: boolean;
  points: number;
}

export interface JugaadCard {
  id: string;
  title: string;
  hindiTitle: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export interface PlayerPosition {
  x: number;
  y: number;
  z: number;
  rotY: number;
}
