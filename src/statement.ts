export type JsonPrimitive = null | boolean | number | string;

export interface JsonSerializableObject {
  [key: string]: JsonSerializable;
}

export type JsonSerializableArray = Array<JsonSerializable>;

export type JsonSerializable =
  | JsonPrimitive
  | JsonSerializableObject
  | JsonSerializableArray;

export interface XApiAgentMbox {
  mbox: string;
  objectType: "Agent";
  name?: string;
}

export interface XApiAgentMboxSha {
  mbox_sha1sum: string;
  objectType: "Agent";
  name?: string;
}

export interface XApiAgentAccount {
  account: {
    homepage: string;
    name: string;
  };
  name?: string;
}

export type XApiAgent = XApiAgentMbox | XApiAgentMboxSha | XApiAgentAccount;

export interface i18nStrings {
  [lang: string]: string;
}

export interface XApiVerb {
  id: string;
  display: i18nStrings;
}

export interface XApiActivity {
  id: string;
  definition?: {
    name: i18nStrings;
    description: i18nStrings;
    type: string;
    extensions?: JsonSerializableObject;
  };
  objectType: "Activity";
}

export interface XApiScore {
  scaled?: number,
  min?: number,
  max?: number,
  raw?: number
}

export interface XApiResult {
  score?: XApiScore;
  success?: boolean;
  completion?: boolean;
  duration?: string;
  response?: string;
  extensions?: JsonSerializableObject;
}

export interface XApiAttachment {
  contentType: string;
  usageType: string;
  display: Record<string, string>;
  description: Record<string, string>;
  fileUrl: string;
  length?: number;
  sha2?: number;
  // TODO: content / multipart
}

export type XApiAttachments = Array<XApiAttachment>;

export type XApiObject = XApiActivity;

export type XApiActor = XApiAgent;

export interface XApiStatement {
  id?: string;
  actor: XApiActor;
  verb: XApiVerb;
  object: XApiObject;
  context?: JsonSerializableObject;
  result?: XApiResult;
  timestamp?: string;
  attachments?: Array<XApiAttachment>;
}
