import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

type CookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

function extractCookieOptions(cookie: {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date | number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: boolean | "strict" | "lax" | "none";
}): CookieOptions {
  const options: CookieOptions = {};

  if (cookie.path !== undefined) options.path = cookie.path;
  if (cookie.domain !== undefined) options.domain = cookie.domain;
  if (cookie.maxAge !== undefined) options.maxAge = cookie.maxAge;
  if (cookie.httpOnly !== undefined) options.httpOnly = cookie.httpOnly;
  if (cookie.secure !== undefined) options.secure = cookie.secure;

  if (cookie.expires !== undefined) {
    options.expires =
      typeof cookie.expires === "number"
        ? new Date(cookie.expires)
        : cookie.expires;
  }

  if (cookie.sameSite !== undefined) {
    if (cookie.sameSite === true) options.sameSite = "strict";
    else if (cookie.sameSite === false) options.sameSite = "none";
    else options.sameSite = cookie.sameSite;
  }

  return options;
}

function copyCookies(source: NextResponse, target: NextResponse): void {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value, extractCookieOptions(cookie));
  });
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: Array<{
            name: string;
            value: string;
            options?: CookieOptions;
          }>,
        ) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  const isPublicRoute =
    pathname === "/login" ||
    pathname === "/auth/callback" ||
    pathname.startsWith("/auth/");

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";

    if (pathname !== "/" && !pathname.startsWith("/api/")) {
      url.searchParams.set("redirectTo", pathname);
    }

    const redirectResponse = NextResponse.redirect(url);
    copyCookies(supabaseResponse, redirectResponse);
    return redirectResponse;
  }

  if (user && pathname === "/login") {
    const redirectTo = request.nextUrl.searchParams.get("redirectTo") || "/";
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    url.searchParams.delete("redirectTo");

    const redirectResponse = NextResponse.redirect(url);
    copyCookies(supabaseResponse, redirectResponse);
    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
