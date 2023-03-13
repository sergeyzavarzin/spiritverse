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
      accounts: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
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
      user_actions: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          meta: Json | null
          title: string | null
          type: string | null
          user_id: string | null
          value: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta?: Json | null
          title?: string | null
          type?: string | null
          user_id?: string | null
          value?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta?: Json | null
          title?: string | null
          type?: string | null
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
      wallets: {
        Row: {
          address: string | null
          created_at: string | null
          id: string
          meta: Json | null
          mnemonic: string | null
          pk: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          mnemonic?: string | null
          pk?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          id?: string
          meta?: Json | null
          mnemonic?: string | null
          pk?: string | null
          type?: string | null
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_crystals: {
        Args: {
          uid: string
          amount: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
