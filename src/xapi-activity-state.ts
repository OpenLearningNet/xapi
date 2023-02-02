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
    config.activityId,
    stateId,
    config.actor,
    state
  ).then((response) => response.status === 200);
};

export const retrieveActivityState = (
  config: XApiConfig,
  stateId: string,
  defaultValue?: XApiState
): Promise<XApiState> => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;

  return lrs.retrieveActivityState(
    config.activityId,
    stateId,
    config.actor
  ).then((response) => {
    if (defaultValue !== undefined && response.status === 404) {
      return Promise.resolve(defaultValue);
    } else if (response.status !== 200) {
      return Promise.reject(response);
    } else {
      return response.json();
    }
  });
};
