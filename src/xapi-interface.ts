import { Lrs } from "./lrs";
import { buildCmi5Statement } from "./xapi-cmi5";
export interface XApiConfig {
  lrs: Lrs;
  actor: any;
  activityId: string;
  registration: string | null;
  initTimeSeconds?: number;
  isCmi5: boolean;
}

export const initCmi5 = async (): Promise<XApiConfig> => {
  const urlParams = new URLSearchParams(window.location.search);

  const endpoint = urlParams.get("endpoint");
  const fetchUrl = urlParams.get("fetch");

  const actorJson = urlParams.get("actor");
  const actor = JSON.parse(actorJson || "{}"); // this needs to be JSON decoded

  const activityId = urlParams.get("activityId");
  const registration = urlParams.get("registration");

  if (!endpoint || !fetchUrl || !activityId) {
    throw new Error("Invalid query parameters for cmi5 init");
  }

  const response = await fetch(fetchUrl, {
    method: "POST",
    credentials: "include",
    mode: "cors"
  });
  const data = await response.json();

  if (!data['auth-token']) {
    throw new Error("No auth-token in fetch");
  }

  const auth = data['auth-token'];

  const lrs = new Lrs({
    endpoint: endpoint,
    auth: auth || "",
  });
  
  const config = {
    lrs,
    actor,
    activityId,
    registration,
    initTimeSeconds: Date.now() / 1000,
    isCmi5: true
  };

  await lrs.saveStatement(buildCmi5Statement(config, "initialized"))

  return config;
};

export const initTincan = (): XApiConfig | null => {
  // xAPI configuration is sent in the URL query string parameters
  const urlParams = new URLSearchParams(window.location.search);

  const endpoint = urlParams.get("endpoint");
  const auth = urlParams.get("auth");

  const actorJson = urlParams.get("actor");
  const actor = JSON.parse(actorJson || "{}"); // this needs to be JSON decoded

  const activityId = urlParams.get("activity_id");
  const registration = urlParams.get("registration");

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
    isCmi5: false
  };
};

export const initLrs = (isCmi5=false) => isCmi5 ? initCmi5() : initTincan();
