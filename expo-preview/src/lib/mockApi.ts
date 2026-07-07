export const mockFetch = async <T>(data: T, delay = 500): Promise<T> => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return data;
};
