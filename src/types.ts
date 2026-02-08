
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  // Added sources to store grounding metadata chunks for citations
  sources?: any[];
}

export interface NavItem {
  label: string;
  href: string;
}