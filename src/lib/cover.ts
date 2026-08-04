function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const ANGLES = [115, 135, 150, 160, 195, 225];
const FROM_STOPS = [8, 14, 20, 26];
const TO_STOPS = [55, 65, 75, 85];

export function getCoverVars(seed: string): { angle: number; from: number; to: number } {
  const h = hashString(seed);
  const angle = ANGLES[h % ANGLES.length];
  const from = FROM_STOPS[Math.floor(h / ANGLES.length) % FROM_STOPS.length];
  const to = TO_STOPS[Math.floor(h / (ANGLES.length * FROM_STOPS.length)) % TO_STOPS.length];
  return { angle, from, to };
}

export type TagIcon = 'rag' | 'voice' | 'agentic' | 'pm' | 'default';

const TAG_ICON_MAP: Record<string, TagIcon> = {
  rag: 'rag',
  'voice-ai': 'voice',
  'agentic-workflows': 'agentic',
  'ai-product-management': 'pm',
};

export function getTagIcon(tags: string[]): TagIcon {
  for (const tag of tags) {
    if (TAG_ICON_MAP[tag]) return TAG_ICON_MAP[tag];
  }
  return 'default';
}
