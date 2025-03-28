async function get<T>(url: URL): Promise<T> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`GET ${url} failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function post<T>(
  url: URL,
  data: BodyInit | null | undefined,
  headers: object = {},
): Promise<T> {
  const uniqHeaders = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    ...headers,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...uniqHeaders },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`POST ${url} failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const api = { get, post };
