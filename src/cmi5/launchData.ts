/**
 * Define the CMI5 Launch Data type (LMS.LaunchData)
 */

import { XApiContext } from "../xapi/statement";

export interface Cmi5LaunchData {
  contextTemplate: XApiContext;
  launchMode: "Normal" | "Browse" | "Review";
  returnUrl: string;
  launchParameters: string; // e.g. "Start=1,QuizMode=1,FastForward=On"
  entitlementKey: {
    courseStructure: string;
    alternate: string;
  };
  moveOn:
    | "Passed"
    | "Completed"
    | "CompletedAndPassed"
    | "CompletedOrPassed"
    | "NotApplicable";
  masteryScore: number;
}
