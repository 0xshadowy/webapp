export async function get<Response>(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts);
  const data: Response = await res.json();
  return data;
}
