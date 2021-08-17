import TinCan from "tincanjs/build/tincan";
import { saveStatement, XApiConfig } from "./xapi-interface";

const ADL_VERBS_ROOT = "http://adlnet.gov/expapi/verbs/";
const OL_EXTENSIONS_ROOT = "https://xapi.openlearning.com/extensions/";

type primitive = null | boolean | number | string;

interface SubmissionData {
  [key: string]: primitive | SubmissionData;
}

const buildStatement = (
  config: XApiConfig,
  submission?: SubmissionData
) => {
  const ol_extensions: Record<string, SubmissionData> = {};

  if (submission) {
    ol_extensions[OL_EXTENSIONS_ROOT + "submission-data"] = submission;
  }

  return new TinCan.Statement({
    actor: config.actor, // the actor data sent by OpenLearning
    object: {
      id: config.activity_id, // the activity_id sent by OpenLearning
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
  });
};

export const saveCompletion = (
  config: XApiConfig,
  submission?: SubmissionData
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const lrs = config.lrs;
  const statement = buildStatement(config, submission);

  return saveStatement(lrs, statement);
};
