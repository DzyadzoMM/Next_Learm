'use client';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { register, RegisterState } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/ui/dashboard';

  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(
    register,
    { errors: {}, message: null },
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create your account
        </h1>
        <div className="w-full">
          {/* Name */}
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="name">
              Name
            </label>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            />
            {state?.errors?.name && (
              <p className="text-sm text-red-500 mt-1">{state.errors.name.join(', ')}</p>
            )}
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.email && (
              <p className="text-sm text-red-500 mt-1">{state.errors.email.join(', ')}</p>
            )}
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            {state?.errors?.password && (
              <p className="text-sm text-red-500 mt-1">{state.errors.password.join(', ')}</p>
            )}
          </div>
        </div>

        {/* прихований інпут для callbackUrl */}
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <Button className="mt-4 w-full" disabled={isPending}>
          Sign up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <div className="flex h-8 items-end space-x-1">
          {state?.message && (
            <p className={`text-sm ${state.message.includes('exists') || state.message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {state.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
