import { XApiResult, XApiScore, XApiStatement } from "./statement";
import { XApiConfig } from "./xapi-interface";

// TODO: Context from LMS.LaunchData

const ADL_VERBS_ROOT = "http://adlnet.gov/expapi/verbs/";

type VerbSuffix =
  | "launched"
  | "initialized"
  | "completed"
  | "passed"
  | "failed"
  | "abandoned"
  | "waived"
  | "terminated"
  | "satisfied";

export const buildCmi5Statement = (
  config: XApiConfig,
  verbSuffix: VerbSuffix,
  result?: XApiResult
): XApiStatement => {
  const statement: XApiStatement = {
    actor: config.actor, // the actor data sent by OpenLearning
    object: {
      id: config.activityId, // the activityId sent by OpenLearning
      objectType: "Activity",
    },
    context: {
      registration: config.registration, // the registration sent by OpenLearning
    },
    verb: {
      id: ADL_VERBS_ROOT + verbSuffix,
      display: {
        "en-US": verbSuffix
      },
    }
  };

  if (result) {
    statement.result = result
  }
  return statement;
};

const saveStatement = (
  config: XApiConfig,
  statement: XApiStatement
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }
  return config.lrs.saveStatement(statement);
};

const getDuration = (config: XApiConfig) => {
  if (!config.initTimeSeconds) {
    return undefined;
  }

  const now = Date.now() / 1000;
  const init = config.initTimeSeconds;
  const diff = (now - init).toFixed(2);
  return "PT" + diff + "S";
}

export const saveCompleted = (config: XApiConfig) => {
  return saveStatement(config, buildCmi5Statement(config, "completed", { completion: true, duration: getDuration(config) }));
};

export const savePassed = (
  config: XApiConfig,
  score?: XApiScore
) => {
  return saveStatement(config, buildCmi5Statement(config, "passed", {
    score,
    success: true,
    duration: getDuration(config)
  }));
};

export const saveFailed = (
  config: XApiConfig,
  score?: XApiScore
) => {
  return saveStatement(config, buildCmi5Statement(config, "failed", {
    score,
    success: false,
    duration: getDuration(config)
  }));
};

export const saveAbandoned = (config: XApiConfig) => {
  return saveStatement(config, buildCmi5Statement(config, "abandoned", { duration: getDuration(config) }));
};

export const saveWaived = (config: XApiConfig) => {
  return saveStatement(config, buildCmi5Statement(config, "waived", { success: true, completion: true }));
};

export const saveTerminated = (config: XApiConfig) => {
  return saveStatement(config, buildCmi5Statement(config, "terminated", { duration: getDuration(config) }));
};

export const saveSatisfied = (config: XApiConfig) => {
  return saveStatement(config, buildCmi5Statement(config, "satisfied", { duration: getDuration(config) }));
};
