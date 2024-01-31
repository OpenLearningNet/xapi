/**
 * This file contains the logic for launching a cmi5 course package (AU).
 */

import { XApiConfig } from "../xapi/config";
import { Lrs } from "../xapi/lrs";
import { buildCmi5Statement, sendTerminated } from "./statements";

export const initCmi5 = async (): Promise<XApiConfig> => {
  const urlParams = new URLSearchParams(window.location.search);

  const endpoint = urlParams.get("endpoint");
  const fetchUrl = urlParams.get("fetch");

  const actorJson = urlParams.get("actor");
  const actor = JSON.parse(actorJson || "{}"); // this needs to be JSON decoded

  const activityId = urlParams.get("activityId");
  const registration = urlParams.get("registration") || undefined;

  if (!endpoint || !fetchUrl || !activityId) {
    throw new Error("Invalid query parameters for cmi5 init");
  }

  const response = await fetch(fetchUrl, {
    method: "POST",
    credentials: "include",
    mode: "cors",
  });
  const data = await response.json();

  if (!data["auth-token"]) {
    throw new Error("No auth-token in fetch");
  }

  const auth = data["auth-token"];

  const lrs = new Lrs({
    endpoint: endpoint,
    auth: `Basic ${auth}`,
  });

  const config: XApiConfig = {
    lrs,
    actor,
    activityId,
    registration,
    initTimeSeconds: Date.now() / 1000,
    isCmi5: true,
    automaticTermination: true
  };

  const previousStateResponse = await lrs.retrieveActivityState(
    activityId,
    "LMS.LaunchData",
    config.actor,
    registration
  );
  config.launchData = await previousStateResponse.json();

  await lrs.sendStatement(buildCmi5Statement(config, "initialized"));

  window.addEventListener("beforeunload", async () => {
    if (config.automaticTermination) {
      await sendTerminated(config);
    }
  });

  return config;
};
