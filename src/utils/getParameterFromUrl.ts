export default function getParameterFromUrl(url: string, param: string): string | null {
  const urlObject = new URL(url.replace(/\\/g, ''));
  const params = new URLSearchParams(urlObject.search);

  return params.get(param);
}