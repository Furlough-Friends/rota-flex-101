export const get = async (url: String, token: String | undefined) => {
  const response = await fetch(url as RequestInfo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const put = async (url: String, token: String | undefined) => {
  const response = await fetch(url as RequestInfo, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const post = async (
  url: String,
  token: String | undefined,
  data: Object
) => {
  const response = await fetch(url as RequestInfo, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return response;
};
