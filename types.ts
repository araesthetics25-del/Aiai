
export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export enum PersonaType {
  PROFESSIONAL = 'PROFESSIONAL',
  FRIENDLY = 'FRIENDLY',
  CUSTOM = 'CUSTOM'
}

export interface Persona {
  id: PersonaType;
  name: string;
  description: string;
  systemPrompt: string;
  icon: string;
}
