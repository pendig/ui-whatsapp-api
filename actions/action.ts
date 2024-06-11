'use server';

import axios from 'axios';

export const createNewSession = async (sessionName: string) => {
  try {
    const endpoint = `${process.env.API_ENDPOINT}/session/start/${sessionName}`;

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.table({ createNewSession: response.data });
    return response.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.error || error?.message || 'An error occurred';
    const errorResponse = {
      success: false,
      error: errorMessage,
    };

    console.table({ errorResponse });

    return errorResponse;
  }
};
