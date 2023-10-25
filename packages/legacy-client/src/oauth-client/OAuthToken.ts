/*
 * Copyright 2023 Palantir Technologies, Inc. All rights reserved.
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

import type { Token, TokenValue } from "./Token";
export class OAuthToken implements Token {
  accessToken: TokenValue;
  tokenType: string;
  refreshToken: string;
  /** The epoch milliseconds when the access token will expire. */
  expiresAt: number;

  constructor(tokenResponse: {
    access_token: TokenValue;
    token_type: string;
    refresh_token: string;
    expires_in: number;
  }) {
    throw new Error("not implemented");
  }

  /** The number of seconds until the access token expires. */
  get expiresIn(): number {
    throw new Error("not implemented");
  }

  /** Whether the access token has expired. */
  get isExpired(): boolean {
    throw new Error("not implemented");
  }
}
