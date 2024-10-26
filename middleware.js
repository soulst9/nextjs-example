// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const token = request.cookies.get('userToken');

//   // 로그인 페이지로의 무한 리다이렉션을 방지
//   if (!token && request.nextUrl.pathname !== '/login') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // 토큰이 있는 경우 로그인 페이지에 접근하려고 하면 홈으로 리다이렉트
//   if (token && request.nextUrl.pathname === '/login') {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|favicon.ico).*)'],
// };

export function middleware(request) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/images/')) {
    return NextResponse.next()
  }
  // 다른 미들웨어 로직...
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};