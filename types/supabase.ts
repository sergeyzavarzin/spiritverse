export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          created_at: string | null
          user_id: string | null
          name: string | null
          power: number
          speed: number
          health: number
          energy: number
          image: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          user_id?: string | null
          name?: string | null
          power?: number
          speed?: number
          health?: number
          energy?: number
          image?: string | null
          id?: string
        }
        Update: {
          created_at?: string | null
          user_id?: string | null
          name?: string | null
          power?: number
          speed?: number
          health?: number
          energy?: number
          image?: string | null
          id?: string
        }
      }
      crystals: {
        Row: {
          user_id: string | null
          created_at: string | null
          value: number | null
          id: string
        }
        Insert: {
          user_id?: string | null
          created_at?: string | null
          value?: number | null
          id?: string
        }
        Update: {
          user_id?: string | null
          created_at?: string | null
          value?: number | null
          id?: string
        }
      }
      notifications: {
        Row: {
          created_at: string | null
          user_id: string | null
          title: string | null
          description: string | null
          type: string | null
          meta: Json | null
          id: string
        }
        Insert: {
          created_at?: string | null
          user_id?: string | null
          title?: string | null
          description?: string | null
          type?: string | null
          meta?: Json | null
          id?: string
        }
        Update: {
          created_at?: string | null
          user_id?: string | null
          title?: string | null
          description?: string | null
          type?: string | null
          meta?: Json | null
          id?: string
        }
      }
      tasks: {
        Row: {
          created_at: string | null
          active: boolean | null
          title: string | null
          reward: number | null
          goal: number | null
          target: string | null
          category: string | null
          link: string | null
          id: string
          starts_at: string | null
          ends_at: string | null
        }
        Insert: {
          created_at?: string | null
          active?: boolean | null
          title?: string | null
          reward?: number | null
          goal?: number | null
          target?: string | null
          category?: string | null
          link?: string | null
          id?: string
          starts_at?: string | null
          ends_at?: string | null
        }
        Update: {
          created_at?: string | null
          active?: boolean | null
          title?: string | null
          reward?: number | null
          goal?: number | null
          target?: string | null
          category?: string | null
          link?: string | null
          id?: string
          starts_at?: string | null
          ends_at?: string | null
        }
      }
      tokens: {
        Row: {
          created_at: string | null
          user_id: string | null
          value: number | null
          id: string
        }
        Insert: {
          created_at?: string | null
          user_id?: string | null
          value?: number | null
          id?: string
        }
        Update: {
          created_at?: string | null
          user_id?: string | null
          value?: number | null
          id?: string
        }
      }
    }
    Views: {
      random_characters: {
        Row: {
          created_at: string | null
          user_id: string | null
          name: string | null
          power: number | null
          speed: number | null
          health: number | null
          energy: number | null
          image: string | null
          id: string | null
        }
        Insert: {
          created_at?: string | null
          user_id?: string | null
          name?: string | null
          power?: number | null
          speed?: number | null
          health?: number | null
          energy?: number | null
          image?: string | null
          id?: string | null
        }
        Update: {
          created_at?: string | null
          user_id?: string | null
          name?: string | null
          power?: number | null
          speed?: number | null
          health?: number | null
          energy?: number | null
          image?: string | null
          id?: string | null
        }
      }
    }
    Functions: {
      reduce_character_energy: {
        Args: { character_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
