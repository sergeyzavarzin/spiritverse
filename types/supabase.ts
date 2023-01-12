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
          energy: number
          health: number
          id: string
          image: string | null
          name: string | null
          power: number
          speed: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          energy?: number
          health?: number
          id?: string
          image?: string | null
          name?: string | null
          power?: number
          speed?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          energy?: number
          health?: number
          id?: string
          image?: string | null
          name?: string | null
          power?: number
          speed?: number
          user_id?: string | null
        }
      }
      crystals: {
        Row: {
          created_at: string | null
          id: string
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          value?: number | null
        }
      }
      notifications: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          meta: Json | null
          title: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta?: Json | null
          title?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta?: Json | null
          title?: string | null
          type?: string | null
          user_id?: string | null
        }
      }
      tasks: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string | null
          description: string | null
          ends_at: string | null
          goal: number | null
          id: string
          link: string | null
          reward: number | null
          starts_at: string | null
          target: string | null
          title: string | null
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          goal?: number | null
          id?: string
          link?: string | null
          reward?: number | null
          starts_at?: string | null
          target?: string | null
          title?: string | null
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          goal?: number | null
          id?: string
          link?: string | null
          reward?: number | null
          starts_at?: string | null
          target?: string | null
          title?: string | null
        }
      }
      tokens: {
        Row: {
          created_at: string | null
          id: string
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string | null
          value?: number | null
        }
      }
      users_tasks: {
        Row: {
          created_at: string | null
          done: boolean
          id: string
          task_id: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          done?: boolean
          id?: string
          task_id: string
          user_id: string
          value?: number
        }
        Update: {
          created_at?: string | null
          done?: boolean
          id?: string
          task_id?: string
          user_id?: string
          value?: number
        }
      }
    }
    Views: {
      random_characters: {
        Row: {
          created_at: string | null
          energy: number | null
          health: number | null
          id: string | null
          image: string | null
          name: string | null
          power: number | null
          speed: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          energy?: number | null
          health?: number | null
          id?: string | null
          image?: string | null
          name?: string | null
          power?: number | null
          speed?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          energy?: number | null
          health?: number | null
          id?: string | null
          image?: string | null
          name?: string | null
          power?: number | null
          speed?: number | null
          user_id?: string | null
        }
      }
    }
    Functions: {
      add_crystals: {
        Args: { uid: string; amount: number }
        Returns: undefined
      }
      fight_battle: {
        Args: { uid: string; character_id: string; win: number }
        Returns: undefined
      }
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
