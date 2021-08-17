import TinCan from "tincan";

export interface XApiConfig {
  lrs: TinCan.LRS,
  actor: any,
  activity_id: string,
  registration: string
};

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

  var lrs = new TinCan.LRS({
    endpoint: endpoint,
    auth: auth,
  });

  return {
    lrs: lrs,
    actor: actor,
    activity_id: activity_id,
    registration: registration,
  };
};

export const saveStatement = (lrs: TinCan.LRS, statement: TinCan.Statement) => {
  return new Promise(function (resolve, reject) {
    lrs.saveStatement(statement, {
      callback: function (error: any, xhr: XMLHttpRequest) {
        if (error) {
          reject({
            error: error,
            xhr: xhr,
          });
        } else {
          resolve(xhr);
        }
      },
    });
  });
};
