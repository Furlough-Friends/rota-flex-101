export const get = async (url: string, token: string | undefined) => {
  const response = await fetch(url as RequestInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const put = async (url: string, token: string | undefined) => {
  const response = await fetch(url as RequestInfo, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const post = async (
  url: string,
  token: string | undefined,
  data: object
) => {
  const response = await fetch(url as RequestInfo, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return response;
};
