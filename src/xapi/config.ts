import { Lrs } from "./lrs";
import { XApiActor } from "./statement";
import { Cmi5LaunchData } from "../cmi5/launchData";

export interface XApiConfig {
  lrs: Lrs;
  actor: XApiActor;
  activityId: string;
  registration?: string;
  initTimeSeconds?: number;
  isCmi5: boolean;
  launchData?: Cmi5LaunchData;
}
