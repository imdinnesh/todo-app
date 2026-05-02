import axios from 'axios';
import { AppError } from '../utils/AppError';

export const getCurrentDate = async (): Promise<string> => {
  try {
    const response = await axios.get<any>(
      'https://timeapi.io/api/v1/time/current/utc'
    );
    
    // The API returns {"utc_time": "YYYY-MM-DDTHH:MM:SS..."}
    if (response.data && response.data.utc_time) {
        // Extract the date part (YYYY-MM-DD)
        return response.data.utc_time.split('T')[0];
    }
    
    throw new Error('Unexpected response format from TimeAPI');
  } catch (error: any) {
    console.error('Error fetching time from TimeAPI:', error);
    throw new AppError('Failed to fetch current date from external service', 503, error.message);
  }
};
