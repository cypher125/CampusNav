import type { Building } from '@/lib/types';

/**
 * Load buildings from the API
 * @returns Promise resolving to an array of buildings
 */
export async function loadBuildings(): Promise<Building[]> {
  try {
    const response = await fetch('/api/buildings', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache', // Skip cache to ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load buildings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading buildings:", error);
    throw error;
  }
}

/**
 * Save buildings to the API
 * @param buildings Array of buildings to save
 * @returns Promise resolving to a success message
 */
export async function saveBuildings(buildings: Building[]): Promise<string> {
  try {
    const response = await fetch('/api/buildings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildings),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save buildings: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.message || 'Buildings saved successfully';
  } catch (error) {
    console.error("Error saving buildings:", error);
    throw error;
  }
} 