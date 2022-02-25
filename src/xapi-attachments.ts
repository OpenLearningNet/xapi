import { XApiAttachment, XApiStatement } from "./statement";
import { XApiConfig } from "./xapi-interface";

const OL_VERBS_ROOT = "https://xapi.openlearning.com/verbs/";
const SUPPORTING_MEDIA_ATTACHMENT =
  "http://id.tincanapi.com/attachment/supporting_media";

export type OLVerbShorthand = "published" | "attached";

export interface SupportingMedia {
  contentType: string;
  fileUrl: string;
  display: string | Record<string, string>;
  description: string | Record<string, string>;
}

export const convertMediaToAttachment = ({
  contentType,
  fileUrl,
  display,
  description,
}: SupportingMedia): XApiAttachment => {
  if (typeof display === "string") {
    display = {
      "en-US": display,
    };
  }

  if (typeof description === "string") {
    description = {
      "en-US": description,
    };
  }

  return {
    contentType: contentType,
    usageType: SUPPORTING_MEDIA_ATTACHMENT,
    display: display,
    description: description,
    fileUrl: fileUrl,
  };
};

export const buildStatement = (
  config: XApiConfig,
  attachments: Array<XApiAttachment>,
  verb: OLVerbShorthand
): XApiStatement => {
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
      id: OL_VERBS_ROOT + verb,
      display: {
        "en-US": verb,
      },
    },
    attachments: attachments,
  };
};

export const saveAttachments = (
  config: XApiConfig,
  supportingMedia: Array<SupportingMedia>,
  verb: OLVerbShorthand = "published",
  thumbnailUrl?: string
) => {
  if (!config) {
    return Promise.reject({
      error: "No LRS configured in the URL.",
      xhr: null,
    });
  }

  const attachments = supportingMedia.map(convertMediaToAttachment);

  if (thumbnailUrl) {
    attachments.unshift({
      contentType: "image/png",
      usageType: "https://xapi.openlearning.com/attachment/thumbnail",
      fileUrl: thumbnailUrl,
      display: {
        "en-US": "Thumbnail Image"
      },
      description: {
        "en-US": "Thumbnail Image"
      }
    });
  }

  const lrs = config.lrs;
  const statement = buildStatement(config, attachments, verb);

  return lrs.saveStatement(statement);
};
