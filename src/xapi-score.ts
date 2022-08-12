import { XApiResult, XApiScore, XApiStatement } from "./statement";
import { XApiConfig } from "./xapi-interface";

const ADL_VERBS_ROOT = "http://adlnet.gov/expapi/verbs/";

const buildStatement = (
  config: XApiConfig,
  verbName: string,
  score?: XApiScore
): XApiStatement => {
  const result: XApiResult = {};

  if (score) {
    result.score = score;
  }

  return {
    actor: config.actor, // the actor data sent by OpenLearning
    object: {
      id: config.activity_id, // the activity_id sent by OpenLearning
      objectType: "Activity",
    },
    context: {
      registration: config.registration, // the registration sent by OpenLearning
    },
    verb: {
      id: ADL_VERBS_ROOT + verbName,
      display: {
        "en-US": verbName
      },
    },
    result
  };
};

export const savePassed = (
  config: XApiConfig,
  score?: XApiScore
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;
  const statement = buildStatement(config, "passed", score);

  return lrs.saveStatement(statement);
};


export const saveFailed = (
  config: XApiConfig,
  score?: XApiScore
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;
  const statement = buildStatement(config, "failed", score);

  return lrs.saveStatement(statement);
};

export const saveScored = (
  config: XApiConfig,
  score: XApiScore
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;
  const statement = buildStatement(config, "scored", score);

  return lrs.saveStatement(statement);
};
