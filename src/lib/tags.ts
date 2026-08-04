const LABEL_OVERRIDES: Record<string, string> = {
  rag: 'RAG',
  'voice-ai': 'Voice AI',
  'agentic-workflows': 'Agentic Workflows',
  'ai-product-management': 'AI Product Management',
};

export function humanizeTag(tag: string): string {
  return LABEL_OVERRIDES[tag] ?? tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
