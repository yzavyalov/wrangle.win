/**
 * Copyright (c) Microblink Ltd. All rights reserved.
 */
import { CameraExperienceState } from "../../../utils/data-structures";
// TODO: do we need anything except CardSingleSide, CardMultiSide and Barcode?
function getStateClass(state) {
  let stateClass = "is-default";
  switch (state) {
    case CameraExperienceState.BarcodeScanning:
    case CameraExperienceState.Classification:
      stateClass = "is-classification";
      break;
    case CameraExperienceState.Default:
      stateClass = "is-default";
      break;
    case CameraExperienceState.Detection:
      stateClass = "is-detection";
      break;
    case CameraExperienceState.FacePhotoCovered:
      stateClass = "is-error-move-closer";
      console.log("Face photo covered");
      break;
    case CameraExperienceState.MoveFarther:
      stateClass = "is-error-move-farther";
      break;
    case CameraExperienceState.MoveCloser:
      stateClass = "is-error-move-closer";
      break;
    case CameraExperienceState.AdjustAngle:
      stateClass = "is-error-adjust-angle";
      break;
    case CameraExperienceState.Flip:
      stateClass = "is-flip";
      break;
    case CameraExperienceState.Done:
      stateClass = "is-done";
      break;
    case CameraExperienceState.DoneAll:
      stateClass = "is-done-all";
      break;
    // We use the same class for blur and glare
    case CameraExperienceState.BlurDetected:
    case CameraExperienceState.GlareDetected:
    // and for wrong side
    case CameraExperienceState.WrongSide:
    // and for passport page errors
    case CameraExperienceState.MovePassportDownError:
    case CameraExperienceState.MovePassportUpError:
    case CameraExperienceState.MovePassportLeftError:
    case CameraExperienceState.MovePassportRightError:
      stateClass = "is-error-move-closer";
      break;
    default:
    // Reset class
  }
  return stateClass;
}
export { getStateClass };
