'use client';
import IconLockDots from '@/components/icon/icon-lock-dots';
import IconMail from '@/components/icon/icon-mail';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import IconLoader from '../icon/icon-loader';

const ComponentsAuthLoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await signIn('credentials', {
      username: e.target.username.value,
      password: e.target.Password.value,
      redirect: false,
    });

    if (result?.error) {
      toast.dismiss();
      toast.error('Invalid username or password');
    } else {
      toast.success('Successfully signed in');
    }
    setIsSubmitting(false);
  };

  return (
    <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
      <div>
        <label htmlFor="username">Username</label>
        <div className="relative text-white-dark">
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            className="form-input ps-10 placeholder:text-white-dark"
            disabled={isSubmitting}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            type="password"
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
            disabled={isSubmitting}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
        disabled={isSubmitting} // Disable tombol ketika sedang submit
      >
        {isSubmitting ? (
          <>
            <IconLoader className="mr-2 h-5 w-5 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default ComponentsAuthLoginForm;
