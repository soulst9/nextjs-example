// utils/internalApi.js
export const getInternalApiUrl = (path) => {
    const basePath = process.env.NEXT_PUBLIC_APP_ENV === "development" ? '/manage' : '';
    console.log('basePath', process.env.NEXT_PUBLIC_APP_ENV, basePath)
    return `${basePath}${path}`;
  };