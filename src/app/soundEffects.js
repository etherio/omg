import errorAlert01 from "../assets/audio/alert_error-01.ogg";
import errorAlert02 from "../assets/audio/alert_error-02.ogg";
import errorAlert03 from "../assets/audio/alert_error-03.ogg";
import celebration01 from "../assets/audio/hero_simple-celebration-01.ogg";
import celebration02 from "../assets/audio/hero_simple-celebration-02.ogg";
import uiLoading from "../assets/audio/ui_loading.ogg";
import alertOnline from "../assets/audio/state-change_confirm-up.ogg";
import alertOffline from "../assets/audio/state-change_confirm-down.ogg";

const audioWrappers = {};

const audioWrapper = (src) => {
  console.log(src);
  if (src in audioWrappers && audioWrappers[src] instanceof Audio) {
    return audioWrappers[src];
  }
  audioWrappers[src] = new Audio();
  audioWrappers[src].src = src;
  audioWrappers[src].preload = true;
  console.log(audioWrappers[src]);
  return audioWrappers[src];
};

export const error = {
  default: () => audioWrapper(errorAlert01),
  secondary: () => audioWrapper(errorAlert02),
  alternative: () => audioWrapper(errorAlert03),
};

export const success = {
  default: () => audioWrapper(celebration01),
  secondary: () => audioWrapper(celebration02),
};

export const loading = {
  default: () => audioWrapper(uiLoading),
};

export const stateSwitch = {
  online: () => audioWrapper(alertOnline),
  offline: () => audioWrapper(alertOffline),
};
