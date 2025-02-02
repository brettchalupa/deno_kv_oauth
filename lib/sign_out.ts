// Copyright 2023 the Deno authors. All rights reserved. MIT license.
import { deleteCookie } from "../deps.ts";
import {
  COOKIE_BASE,
  getCookieName,
  getSuccessUrl,
  isHttps,
  redirect,
  SITE_COOKIE_NAME,
} from "./_http.ts";

/**
 * Handles the sign-out process, and then redirects the client to the given
 * success URL.
 *
 * @see {@link https://deno.land/x/deno_kv_oauth#redirects-after-sign-in-and-sign-out}
 *
 * @example
 * ```ts
 * import { signOut } from "https://deno.land/x/deno_kv_oauth@$VERSION/mod.ts";
 *
 * export async function signOutHandler(request: Request) {
 *   return signOut(request);
 * }
 * ```
 */
export function signOut(request: Request) {
  const successUrl = getSuccessUrl(request);
  const response = redirect(successUrl);

  const cookieName = getCookieName(SITE_COOKIE_NAME, isHttps(request.url));
  deleteCookie(response.headers, cookieName, { path: COOKIE_BASE.path });
  return response;
}
