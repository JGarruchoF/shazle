export class BaseService {
  headers = {
    Accept: 'application/json',
  };
  async get(url: string) {
    const response = await fetch(url);
    return response.json();
  }
  async post(url: string, data: string, headers = this.headers) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: headers,
    });
    return response.json();
  }
}
