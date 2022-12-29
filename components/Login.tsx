'use client';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { useSupabase } from './SupabaseProvider';

export default function Login() {
  const { supabase } = useSupabase();

  // const handleEmailLogin = async () => {
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email: 'jon@supabase.com',
  //     password: 'password'
  //   });
  //
  //   if (error) {
  //     console.log({ error });
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google'
  //   });
  //
  //   if (error) {
  //     console.log({ error });
  //   }
  // };

  // this `session` is from the root loader - server-side
  // therefore, it can safely be used to conditionally render
  // SSR pages without issues with hydration
  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-2.5">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        onlyThirdPartyProviders
        providers={['google']}
        redirectTo={process.env.NEXT_PUBLIC_REDIRECT_URL ?? 'https://spiritverse.vercel.app'}
      />
    </div>
  );
}