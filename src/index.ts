export { sendAttachments, SupportingMedia } from "./ol/attachments";
export { sendTinCanCompleted, sendTinCanScored } from "./tincan/statements";
export { initCmi5 } from "./cmi5/launch";
export { initTinCan } from "./tincan/launch";

export {
  sendCompleted,
  sendPassed,
  sendFailed,
  sendTerminated,
  getDuration,
} from "./cmi5/statements";

export {
  saveActivityState,
  retrieveActivityState,
} from "./state/activityState";
