export { initLrs, initTincan, initCmi5 } from "./xapi-interface";
export { saveAttachments, SupportingMedia } from "./xapi-attachments";
export { saveCompletion } from "./xapi-completion";
export { saveScored } from "./xapi-scored";
export {
  saveCompleted,
  savePassed,
  saveFailed,
  saveAbandoned,
  saveWaived,
  saveTerminated,
  saveSatisfied
} from "./xapi-cmi5"
export {
  saveActivityState,
  retrieveActivityState,
} from "./xapi-activity-state";
