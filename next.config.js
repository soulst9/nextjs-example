/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   dangerouslyAllowSVG: true,
  //   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  // },  
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.APP_ENV,
    NEXT_PUBLIC_BASE_PATH: process.env.APP_ENV === 'development' ? '/manage' : ''
  }
};

// 나머지 설정은 이전과 동일...

const env = process.env.APP_ENV || 'local';
console.log('env', env)

switch (env) {
  case 'development':
    nextConfig.basePath = '/manage';
    nextConfig.assetPrefix = '/manage';
    nextConfig.publicRuntimeConfig = {
      staticFolder: '/manage',
    }
    break;
  case 'local':
  case 'production':
  case 'staging':
    nextConfig.basePath = '';
    nextConfig.assetPrefix = '';
    nextConfig.publicRuntimeConfig = {
      staticFolder: '',
    }
    break;
  default:
    throw new Error(`Unsupported environment: ${env}`);
}

module.exports = nextConfig;