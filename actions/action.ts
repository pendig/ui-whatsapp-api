'use server';

import axios from 'axios';

export const createNewSession = async (sessionName: string) => {
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/start/${sessionName}`;

    console.table({ endpoint });

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/terminate/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/terminateAll`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
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
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/status/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
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
