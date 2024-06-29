'use server';

import { authOptions } from '@/lib/authOptions';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export const createNewSession = async (sessionName: string) => {
  const session: any = await getServerSession(authOptions);
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/start/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
    const errorResponse = {
      success: false,
      error: errorMessage,
    };
    return errorResponse;
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
    const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
    const errorResponse = {
      success: false,
      error: errorMessage,
    };
    return errorResponse;
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
    const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
    const errorResponse = {
      success: false,
      error: errorMessage,
    };
    return errorResponse;
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
    const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
    const errorResponse = {
      success: false,
      error: errorMessage,
    };
    return errorResponse;
  }
};
