'use server';

import { authOptions } from '@/lib/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';

const handleForbiddenError = (error: any) => {
  if (error?.response?.status === 403) {
    return {
      success: false,
      error: 'You are not authorized to perform this action',
    };
  }
  const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
  return {
    success: false,
    error: errorMessage,
  };
};

export const createNewSession = async (sessionName: string, callbackUrl?: string) => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/start/${sessionName}?callbackUrl=${callbackUrl}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return handleForbiddenError(error);
  }
};

export const terminateSession = async (sessionName: string) => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/terminate/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return handleForbiddenError(error);
  }
};

export const terminateAllSession = async () => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/terminateAll`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    return handleForbiddenError(error);
  }
};

export const checkSessionStatus = async (sessionName: string) => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/status/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log({error})
    return handleForbiddenError(error);
  }
};

export const editWebhookUrl = async (sessionName: string, newCallbackUrl: string) => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/updateWebhook/${sessionName}`;

    const response = await axios.patch(
      endpoint,
      { callbackUrl: newCallbackUrl },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + session?.accessToken,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return handleForbiddenError(error);
  }
};

export const fetchSessions = async () => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/session/list`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });

    return response.data;
  } catch (error: any) {
    return handleForbiddenError(error);
  }
};
