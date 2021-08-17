import { Lrs } from "./lrs";
export interface XApiConfig {
  lrs: Lrs;
  actor: any;
  activity_id: string;
  registration: string;
}

export const initLrs = () => {
  // xAPI configuration is sent in the URL query string parameters
  const urlParams = new URLSearchParams(window.location.search);

  const endpoint = urlParams.get("endpoint");
  const auth = urlParams.get("auth");

  const actorJson = urlParams.get("actor");
  const actor = JSON.parse(actorJson || "{}"); // this needs to be JSON decoded

  const activity_id = urlParams.get("activity_id");
  const registration = urlParams.get("registration");

  if (!endpoint) {
    return null;
  }

  const lrs = new Lrs({
    endpoint: endpoint,
    auth: auth || "",
  });

  return {
    lrs: lrs,
    actor: actor,
    activity_id: activity_id,
    registration: registration,
  };
};
