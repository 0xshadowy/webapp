export async function get<Response>(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  const data: Response = await res.json();
  return data;
}

export async function post<Response>(url: string, opts?: RequestInit) {
  const res = await fetch(url, { ...opts, method: 'POST' });
  const data: Response = await res.json();
  return data;
}
