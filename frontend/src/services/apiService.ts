export const get = async (request: RequestInfo, token?: string) =>
  fetch(request, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const put = async (request: RequestInfo, token?: string) =>
  fetch(request, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });

export const remove = async (request: RequestInfo, token?: string) =>
  fetch(request, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

export const post = async (
  request: RequestInfo,
  token?: string,
  data: object = {}
) =>
  fetch(request, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
