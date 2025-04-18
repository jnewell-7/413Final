

import { Entertainer } from '../types/Entertainer';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
  totalCount: number;
}

const API_URL = `https://localhost:5000/Entertainer`;

export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number
): Promise<FetchEntertainersResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/AllEntertainers?pageSize=${pageSize}&pageNum=${pageNum}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);
    throw error;
  }
};

export const getEntertainerByID = async (
  entertainerID: number
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_URL}/GetEntertainerByID?entertainerID=${entertainerID}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Entertainer not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainer:', error);
    throw error;
  }
};

export const addEntertainer = async (
  newEnt: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEnt),
    });
    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding entertainer:', error);
    throw error;
  }
};

export const updateEntertainer = async (
  entertainerID: number,
  updatedEnt: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(
      `${API_URL}/UpdateEntertainer/${entertainerID}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEnt),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update entertainer');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating entertainer:', error);
    throw error;
  }
};

export const deleteEntertainer = async (
  entertainerID: number
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/DeleteEntertainer/${entertainerID}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  } catch (error) {
    console.error('Error deleting entertainer:', error);
    throw error;
  }
};