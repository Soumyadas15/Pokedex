import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const validPaths = ['/', '/part1', '/part2', '/part3'];
  
  if (validPaths.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    
    if (url.pathname === '/') {
      url.pathname = '/part1';
    }
    
    const searchParams = new URLSearchParams(url.search);
    
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      url.search = searchParams.toString();
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/part1', '/part2', '/part3'],
};