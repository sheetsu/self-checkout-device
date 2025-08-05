export const parseUrl = (url: string, version: string = 'v1'): string => {
  let finalUrl: string = "";

  finalUrl += version + '/';

  if (url.startsWith('/')) {
    finalUrl += url.substring(1);
  } else {
    finalUrl += url;
  }

  return finalUrl;
};
