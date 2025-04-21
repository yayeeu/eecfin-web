
/**
 * Helper function to implement retries with exponential backoff.
 */
export async function fetchWithRetry(url: string, options = {}, retries = 2): Promise<Response> {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return response;
    }

    if (retries === 0) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const delay = Math.pow(2, 2 - retries) * 500;
    console.log(`Retrying in ${delay}ms... (${retries} retries left)`);

    await new Promise(resolve => setTimeout(resolve, delay));

    return fetchWithRetry(url, options, retries - 1);
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    const delay = Math.pow(2, 2 - retries) * 500;
    console.log(`Network error. Retrying in ${delay}ms... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1);
  }
}
