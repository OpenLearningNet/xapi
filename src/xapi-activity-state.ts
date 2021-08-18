import { XApiState } from "./lrs";
import { XApiConfig } from "./xapi-interface";

export const saveActivityState = (
  config: XApiConfig,
  stateId: string,
  state: XApiState
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;

  return lrs.saveActivityState(
    config.activity_id,
    stateId,
    config.actor,
    state
  ).then((response) => response.status === 200);
};

export const retrieveActivityState = (
  config: XApiConfig,
  stateId: string
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;

  return lrs.retrieveActivityState(
    config.activity_id,
    stateId,
    config.actor
  ).then((response) => response.json());
};
