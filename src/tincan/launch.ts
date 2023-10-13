import { XApiConfig } from "../xapi/config";
import { Lrs } from "../xapi/lrs";

export const initTinCan = (): XApiConfig | null => {
  // xAPI configuration is sent in the URL query string parameters
  const urlParams = new URLSearchParams(window.location.search);

  const endpoint = urlParams.get("endpoint");
  const auth = urlParams.get("auth");

  const actorJson = urlParams.get("actor");
  const actor = JSON.parse(actorJson || "{}"); // this needs to be JSON decoded

  const activityId = urlParams.get("activity_id");
  const registration = urlParams.get("registration") || undefined;

  if (!endpoint || !activityId) {
    return null;
  }

  const lrs = new Lrs({
    endpoint: endpoint,
    auth: auth || "",
  });

  return {
    lrs,
    actor,
    activityId,
    registration,
    isCmi5: false,
  };
};
