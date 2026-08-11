'use client';
import { useState } from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>

        <Suspense>
          {showLogin ? <LoginForm /> : <RegisterForm />}
        </Suspense>

        <div className="flex justify-center mt-4">
          {showLogin ? (
            <button
              onClick={() => setShowLogin(false)}
              className="text-sm text-blue-600 hover:underline"
            >
              Don’t have an account? Sign up
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
