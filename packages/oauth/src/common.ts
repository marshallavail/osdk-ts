/*
 * Copyright 2024 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type {
  AuthorizationServer,
  Client,
  HttpRequestOptions,
  OAuth2TokenEndpointResponse,
} from "oauth4webapi";
import { processRevocationResponse, revocationRequest } from "oauth4webapi";
import invariant from "tiny-invariant";
import { TypedEventTarget } from "typescript-event-target";
import type { BaseOauthClient, Events } from "./BaseOauthClient.js";
import { throwIfError } from "./throwIfError.js";
import type { Token } from "./Token.js";

// Node 18 is supposed to have a `CustomEvent` but it is not exposed on `globalThis`
// which creates a problem for making a single codebase for node and browser. This polyfill works around it
const CustomEvent = process.env.TARGET === "browser"
  ? globalThis.CustomEvent
  : globalThis.CustomEvent
    ?? class CustomEvent<T> extends Event {
      #detail: T | null;

      constructor(type: string, options: EventInit & { detail: T }) {
        super(type, options);
        this.#detail = options?.detail ?? null;
      }

      get detail() {
        return this.#detail;
      }
    };

declare const process: {
  env: Record<string, string | undefined>;
};

export interface LocalStorageState {
  refresh_token?: string;
  refreshTokenMarker?: string;
}

export type SessionStorageState =
  // when we are going to the login page
  | {
    codeVerifier?: never;
    state?: never;
    oldUrl: string;
  }
  // when we are redirecting to oauth login
  | {
    codeVerifier: string;
    state: string;
    oldUrl: string;
  }
  // when we have the refresh token
  | {
    codeVerifier?: never;
    state?: never;
    oldUrl?: never;
  };

function localStorageKey(client: Client) {
  return `@osdk/oauth : refresh : ${client.client_id}`;
}

export function saveLocal(client: Client, x: LocalStorageState): void {
  // MUST `localStorage?` as nodejs does not have localStorage
  globalThis.localStorage?.setItem(
    localStorageKey(client),
    JSON.stringify(x),
  );
}

export function removeLocal(client: Client): void {
  // MUST `localStorage?` as nodejs does not have localStorage
  globalThis.localStorage?.removeItem(
    localStorageKey(client),
  );
}

export function readLocal(client: Client): LocalStorageState {
  return JSON.parse(
    // MUST `localStorage?` as nodejs does not have localStorage
    globalThis.localStorage?.getItem(
      localStorageKey(client),
    )
      ?? "{}",
  );
}

export function saveSession(client: Client, x: SessionStorageState): void {
  // MUST `sessionStorage?` as nodejs does not have sessionStorage
  globalThis.sessionStorage?.setItem(
    localStorageKey(client),
    JSON.stringify(x),
  );
}

export function removeSession(client: Client): void {
  // MUST `sessionStorage?` as nodejs does not have sessionStorage
  globalThis.sessionStorage?.removeItem(
    localStorageKey(client),
  );
}

export function readSession(client: Client): SessionStorageState {
  return JSON.parse(
    // MUST `sessionStorage?` as nodejs does not have sessionStorage
    globalThis.sessionStorage?.getItem(
      localStorageKey(client),
    )
      ?? "{}",
  );
}

export function common<
  R extends undefined | (() => Promise<Token | undefined>),
>(
  client: Client,
  as: AuthorizationServer,
  _signIn: () => Promise<Token>,
  oauthHttpOptions: HttpRequestOptions,
  refresh: R,
  refreshTokenMarker: string | undefined,
): {
  getToken: BaseOauthClient<keyof Events & string> & { refresh: R };
  makeTokenAndSaveRefresh: (
    resp: OAuth2TokenEndpointResponse,
    type: "signIn" | "refresh",
  ) => Token;
} {
  let token: Token | undefined;
  const eventTarget = new TypedEventTarget<Events>();

  function makeTokenAndSaveRefresh(
    resp: OAuth2TokenEndpointResponse,
    type: "signIn" | "refresh",
  ): Token {
    const { refresh_token, expires_in, access_token } = resp;
    invariant(expires_in != null);
    saveLocal(client, {
      refresh_token,
      refreshTokenMarker,
    });
    token = {
      refresh_token,
      expires_in,
      access_token,
      expires_at: Date.now() + expires_in * 1000,
    };

    eventTarget.dispatchTypedEvent(
      type,
      new CustomEvent(
        type,
        { detail: token },
      ),
    );
    return token;
  }

  let refreshTimeout: ReturnType<typeof setTimeout>;
  function rmTimeout() {
    if (refreshTimeout) clearTimeout(refreshTimeout);
  }
  function restartRefreshTimer(evt: CustomEvent<Token>) {
    if (refresh) {
      rmTimeout();
      refreshTimeout = setTimeout(
        refresh,
        evt.detail.expires_in * 1000 - 60 * 1000,
      );
    }
  }

  async function signOut() {
    invariant(token, "not signed in");

    const result = await processRevocationResponse(
      await revocationRequest(
        as,
        client,
        token.access_token,
        oauthHttpOptions,
      ),
    );

    rmTimeout();

    // Clean up
    removeLocal(client);
    token = undefined;
    throwIfError(result);
    eventTarget.dispatchTypedEvent("signOut", new Event("signOut"));
  }

  let pendingSignIn: Promise<Token> | undefined;
  async function signIn() {
    if (pendingSignIn) {
      return pendingSignIn;
    }
    try {
      pendingSignIn = _signIn();
      return await pendingSignIn;
    } finally {
      pendingSignIn = undefined;
    }
  }

  eventTarget.addEventListener("signIn", restartRefreshTimer);
  eventTarget.addEventListener("refresh", restartRefreshTimer);

  function getTokenOrUndefined() {
    if (!token || Date.now() >= token.expires_at) {
      return undefined;
    }
    return token?.access_token;
  }

  const getToken = Object.assign(async function getToken() {
    if (!token || Date.now() >= token.expires_at) {
      token = await signIn();
    }
    return token?.access_token;
  }, {
    signIn,
    refresh,
    signOut,
    rmTimeout,
    getTokenOrUndefined,
    addEventListener: eventTarget.addEventListener.bind(
      eventTarget,
    ) as typeof eventTarget.addEventListener,
    removeEventListener: eventTarget.removeEventListener.bind(
      eventTarget,
    ) as typeof eventTarget.removeEventListener,
  });

  return { getToken, makeTokenAndSaveRefresh };
}

export function createAuthorizationServer(
  ctxPath: string,
  url: string,
): Required<
  Pick<
    AuthorizationServer,
    | "issuer"
    | "token_endpoint"
    | "authorization_endpoint"
    | "revocation_endpoint"
  >
> {
  const issuer = `${new URL(ctxPath, url.endsWith("/") ? url : url + "/")}`;
  return {
    token_endpoint: `${issuer}/api/oauth2/token`,
    authorization_endpoint: `${issuer}/api/oauth2/authorize`,
    revocation_endpoint: `${issuer}/api/oauth2/revoke_token`,
    issuer,
  };
}
