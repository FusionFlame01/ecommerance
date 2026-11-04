"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import SocialProviders, { type SocialProvider } from "@/components/SocialProviders";

export type AuthMode = "sign-in" | "sign-up";

export interface AuthFormValues {
  name?: string;
  email: string;
  password: string;
}

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit?: (values: AuthFormValues) => void | Promise<void>;
  onSocialSignIn?: (provider: SocialProvider) => void | Promise<void>;
}

const content = {
  "sign-in": {
    title: "Welcome Back!",
    subtitle: "Sign in to continue your fitness journey",
    divider: "Or sign in with",
    submit: "Sign In",
    switchPrompt: "Don't have an account?",
    switchLabel: "Sign Up",
    switchHref: "/sign-up",
  },
  "sign-up": {
    title: "Join Nike Today!",
    subtitle: "Create your account to start your fitness journey",
    divider: "Or sign up with",
    submit: "Sign Up",
    switchPrompt: "Already have an account?",
    switchLabel: "Sign In",
    switchHref: "/sign-in",
  },
} as const;

const inputClass =
  "h-12 w-full rounded-xl border border-light-300 bg-light-100 px-4 text-body text-dark-900 placeholder:text-dark-500 transition-colors focus:border-dark-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-dark-900";

const linkClass =
  "text-dark-900 underline underline-offset-4 transition-colors hover:text-dark-700";

export default function AuthForm({ mode, onSubmit, onSocialSignIn }: AuthFormProps) {
  const copy = content[mode];
  const isSignUp = mode === "sign-up";
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: AuthFormValues = {
      email: String(data.get("email") ?? ""),
      password: String(data.get("password") ?? ""),
      ...(isSignUp && { name: String(data.get("name") ?? "") }),
    };
    setPending(true);
    try {
      await onSubmit?.(values);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full">
      <p className="text-center text-caption font-normal text-dark-700">
        {copy.switchPrompt}{" "}
        <Link href={copy.switchHref} className={`font-medium ${linkClass}`}>
          {copy.switchLabel}
        </Link>
      </p>

      <header className="mt-6 text-center sm:mt-8">
        <h1 className="text-heading-3 font-bold sm:text-[32px] sm:leading-10">{copy.title}</h1>
        <p className="mt-2 text-body text-dark-700">{copy.subtitle}</p>
      </header>

      <div className="mt-8">
        <SocialProviders onSelect={onSocialSignIn} disabled={pending} />
      </div>

      <div className="my-6 flex items-center gap-4" role="separator" aria-label={copy.divider}>
        <span className="h-px flex-1 bg-light-300" />
        <span className="text-caption font-normal text-dark-700">{copy.divider}</span>
        <span className="h-px flex-1 bg-light-300" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {isSignUp && (
          <div className="flex flex-col gap-2">
            <label htmlFor={`${id}-name`} className="text-caption text-dark-900">
              Full Name
            </label>
            <input
              id={`${id}-name`}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              required
              className={inputClass}
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-email`} className="text-caption text-dark-900">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="johndoe@gmail.com"
            required
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor={`${id}-password`} className="text-caption text-dark-900">
              Password
            </label>
            {!isSignUp && (
              <Link href="/forgot-password" className={`text-caption font-normal ${linkClass}`}>
                Forgot password?
              </Link>
            )}
          </div>
          <div className="relative">
            <input
              id={`${id}-password`}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="minimum 8 characters"
              minLength={8}
              required
              aria-describedby={isSignUp ? `${id}-password-hint` : undefined}
              className={`${inputClass} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              aria-controls={`${id}-password`}
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-dark-700 transition-colors hover:text-dark-900 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-dark-900"
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>
          {isSignUp && (
            <p id={`${id}-password-hint`} className="sr-only">
              Password must be at least 8 characters.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 h-14 w-full rounded-full bg-dark-900 text-body-medium text-light-100 transition-colors hover:bg-dark-900/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Please wait…" : copy.submit}
        </button>
      </form>

      {isSignUp && (
        <p className="mt-6 text-center text-footnote text-dark-700">
          By signing up, you agree to our{" "}
          <Link href="/terms" className={linkClass}>
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
        </p>
      )}
    </div>
  );
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="m2 2 20 20" />}
    </svg>
  );
}
