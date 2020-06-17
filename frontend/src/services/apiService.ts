const headers = (token?: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const apiRequest = (method: string) => async (
  request: RequestInfo,
  token?: string,
  data?: object
) =>
  fetch(request, {
    method,
    headers: headers(token),
    body: data && JSON.stringify(data),
  });

export const get = apiRequest('GET');
export const put = apiRequest('PUT');
export const remove = apiRequest('DELETE');
export const post = apiRequest('POST');
