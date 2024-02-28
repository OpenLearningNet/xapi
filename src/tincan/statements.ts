import { XApiConfig } from "../xapi/config";
import {
  JsonSerializable,
  XApiResult,
  XApiScore,
  XApiStatement,
} from "../xapi/statement";

const ADL_VERBS_ROOT = "http://adlnet.gov/expapi/verbs/";
const OL_EXTENSIONS_ROOT = "https://xapi.openlearning.com/extensions/";

type SubmissionData = JsonSerializable;

const buildScoredStatement = (
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
      id: config.activityId, // the activityId sent by OpenLearning
      objectType: "Activity",
    },
    context: {
      registration: config.registration, // the registration sent by OpenLearning
    },
    verb: {
      id: ADL_VERBS_ROOT + verbName,
      display: {
        "en-US": verbName,
      },
    },
    result,
  };
};

const buildCompletedStatement = (
  config: XApiConfig,
  submission?: SubmissionData
): XApiStatement => {
  const ol_extensions: Record<string, SubmissionData> = {};

  if (submission) {
    ol_extensions[OL_EXTENSIONS_ROOT + "submission-data"] = submission;
  }

  return {
    actor: config.actor, // the actor data sent by OpenLearning
    object: {
      id: config.activityId, // the activityId sent by OpenLearning
      objectType: "Activity",
    },
    context: {
      registration: config.registration, // the registration sent by OpenLearning
    },
    verb: {
      id: ADL_VERBS_ROOT + "completed",
      display: {
        "de-DE": "beendete",
        "en-US": "completed",
        "fr-FR": "a terminé",
        "es-ES": "completó",
      },
    },
    result: {
      completion: true,
      extensions: ol_extensions,
    },
  };
};

export const sendTinCanScored = (config: XApiConfig, score: XApiScore) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  if (config.isCmi5) {
    throw new Error("Incompatible statement with cmi5 profile");
  }

  const lrs = config.lrs;
  const statement = buildScoredStatement(config, "scored", score);

  return lrs.sendStatement(statement);
};

export const sendTinCanCompleted = (
  config: XApiConfig,
  submission?: SubmissionData
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  if (config.isCmi5) {
    throw new Error("Incompatible statement with cmi5 profile");
  }

  const lrs = config.lrs;
  const statement = buildCompletedStatement(config, submission);

  return lrs.sendStatement(statement);
};
