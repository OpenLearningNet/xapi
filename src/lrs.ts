import { JsonSerializable, XApiStatement } from "./statement";

export interface LrsConfig {
  endpoint: string;
  auth: string;
}

export type XApiState = JsonSerializable;

export const VERSION = "1.0.2";

export class Lrs {
  endpoint: string;
  auth: string;

  constructor(config: LrsConfig) {
    this.endpoint = config.endpoint;

    // ensure trailing slash on endpoint
    if (this.endpoint.slice(-1) !== "/") {
      this.endpoint += "/";
    }

    this.auth = config.auth;
  }

  saveStatement(statement: XApiStatement) {
    const url = this.endpoint + "statements";
    const method = "PUT";

    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", this.auth);
    headers.set("X-Experience-API-Version", VERSION);

    // TODO: add timestamp to statement

    return fetch(url, {
      method,
      headers,
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(statement),
    });
  }

  saveActivityState(activityId: string, stateId: string, agent: string, state: XApiState) {
    const url = new URL(this.endpoint + "activities/state");
    url.searchParams.set('activityId', activityId);
    url.searchParams.set('stateId', stateId);
    url.searchParams.set('agent', JSON.stringify(agent));

    const method = "POST";
    const headers: HeadersInit = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", this.auth);
    headers.set("X-Experience-API-Version", VERSION);

    return fetch(url.toString(), {
      method,
      headers,
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(state)
    });
  }

  retrieveActivityState(activityId: string, stateId: string, agent: string) {
    const url = new URL(this.endpoint + "activities/state");
    url.searchParams.set('activityId', activityId);
    url.searchParams.set('stateId', stateId);
    url.searchParams.set('agent', JSON.stringify(agent));

    const method = "GET";

    const headers: HeadersInit = new Headers();
    headers.set("Authorization", this.auth);
    headers.set("X-Experience-API-Version", VERSION);

    return fetch(url.toString(), {
      method,
      headers,
      credentials: "include",
      mode: "cors"
    });
  }
}
