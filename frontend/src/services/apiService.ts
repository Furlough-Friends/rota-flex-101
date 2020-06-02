export const get = async (request: RequestInfo, token?: string) => {
  return await fetch(request, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const put = async (request: RequestInfo, token?: string) => {
  return await fetch(request, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const post = async (request: RequestInfo, token?: string, data: object = {}) => {
  return await fetch(request, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
