import { XApiConfig } from "../xapi/config";
import {
  XApiContext,
  XApiObject,
  XApiResult,
  XApiScore,
  XApiStatement,
} from "../xapi/statement";

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

const containsObject = (
  arr: Array<Record<string, any>>,
  key: string,
  value: any
) => {
  return arr.some((obj) => obj[key] === value);
};

export const buildCmi5Statement = (
  config: XApiConfig,
  verbSuffix: VerbSuffix,
  result?: XApiResult
): XApiStatement => {
  const contextTemplate = config.launchData?.contextTemplate;

  // use templated category value
  const category: Array<XApiObject> = [
    ...(contextTemplate?.contextActivities?.category || []),
  ];

  if (
    !containsObject(
      category,
      "id",
      "https://w3id.org/xapi/cmi5/context/categories/cmi5"
    )
  ) {
    category.push({
      id: "https://w3id.org/xapi/cmi5/context/categories/cmi5",
      objectType: "Activity",
    });
  }

  // use templated grouping value
  const grouping: Array<XApiObject> = [
    ...(contextTemplate?.contextActivities?.grouping || []),
  ];

  if (
    result &&
    (result.success !== undefined || result.completion !== undefined) &&
    !containsObject(
      grouping,
      "id",
      "https://w3id.org/xapi/cmi5/context/categories/moveon"
    )
  ) {
    category.push({
      id: "https://w3id.org/xapi/cmi5/context/categories/moveon",
      objectType: "Activity",
    });
  }

  // use templated contextActivities
  const contextActivities = { ...(contextTemplate?.contextActivities || {}) };

  // replace with updated category and grouping
  contextActivities.category = category;
  contextActivities.grouping = grouping;

  // use templated extensions
  const extensions = { ...(contextTemplate?.extensions || {}) };

  const masteryScore = config.launchData?.masteryScore;

  if (
    masteryScore !== undefined &&
    (verbSuffix === "passed" || verbSuffix === "failed")
  ) {
    extensions["https://w3id.org/xapi/cmi5/context/extensions/masteryscore"] =
      masteryScore;
  }

  // use templated context
  const context: XApiContext = { ...contextTemplate };
  // replace updated registration, contextActivities, extensions
  context.registration = config.registration || undefined;
  context.contextActivities = contextActivities;
  context.extensions = extensions;

  const statement: XApiStatement = {
    actor: config.actor,
    object: {
      id: config.activityId,
      objectType: "Activity",
    },
    context,
    verb: {
      id: ADL_VERBS_ROOT + verbSuffix,
      display: {
        "en-US": verbSuffix,
      },
    },
  };

  if (result) {
    statement.result = result;
  }
  return statement;
};

const sendStatement = (config: XApiConfig, statement: XApiStatement, keepalive = false) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }
  return config.lrs.sendStatement(statement, keepalive);
};

export const getDuration = (config: XApiConfig) => {
  if (!config.initTimeSeconds) {
    return undefined;
  }

  const now = Date.now() / 1000;
  const init = config.initTimeSeconds;
  const diff = (now - init).toFixed(2);
  return "PT" + diff + "S";
};

export const sendCompleted = (config: XApiConfig) => {
  return sendStatement(
    config,
    buildCmi5Statement(config, "completed", {
      completion: true,
      duration: getDuration(config),
    })
  );
};

export const sendPassed = (config: XApiConfig, score?: XApiScore) => {
  return sendStatement(
    config,
    buildCmi5Statement(config, "passed", {
      score,
      success: true,
      duration: getDuration(config),
    })
  );
};

export const sendFailed = (config: XApiConfig, score?: XApiScore) => {
  return sendStatement(
    config,
    buildCmi5Statement(config, "failed", {
      score,
      success: false,
      duration: getDuration(config),
    })
  );
};

export const sendTerminated = (config: XApiConfig) => {
  return sendStatement(
    config,
    buildCmi5Statement(config, "terminated", { duration: getDuration(config) }),
    true // keep alive even after the window is closed
  );
};
