'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { validateEmail } from '@/lib/utils';
import { subscribeNewsletter } from '@/lib/api';

interface NewsletterFormProps {
  variant?: 'inline' | 'card';
}

export function NewsletterForm({ variant = 'card' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 验证邮箱格式
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      const result = await subscribeNewsletter(email);
      
      if (result.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(result.message);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Subscription failed, please try again');
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Email address"
          className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm outline-none focus:border-black transition-colors w-48"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <LoadingSpinner />
          ) : status === 'success' ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
      </form>
    );
  }

  return (
    <GlassCard className="relative overflow-hidden h-full" id="newsletter">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 h-full">
        <div className="relative z-10 max-w-xs">
          <h4 className="text-xl font-serif mb-1">Weekly Newsletter</h4>
          <p className="text-sm text-gray-500">
            Get the latest posts directly to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Email address"
              className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm outline-none focus:border-black transition-colors w-48"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? (
                <LoadingSpinner />
              ) : status === 'success' ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <SendIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Status Messages */}
          {status === 'error' && errorMessage && (
            <p className="text-xs text-red-500">{errorMessage}</p>
          )}
          {status === 'success' && (
            <p className="text-xs text-green-600">Subscribed successfully! 🎉</p>
          )}
        </form>
      </div>

      {/* Decorative Background */}
      <div className="absolute -right-10 -bottom-20 w-40 h-40 bg-gray-100 rounded-full blur-3xl" />
    </GlassCard>
  );
}

// Icons
function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default NewsletterForm;
