import errorAlert01 from "../assets/audio/alert_error-01.ogg";
import errorAlert02 from "../assets/audio/alert_error-02.ogg";
import errorAlert03 from "../assets/audio/alert_error-03.ogg";
import celebration01 from "../assets/audio/hero_simple-celebration-01.ogg";
import celebration02 from "../assets/audio/hero_simple-celebration-02.ogg";

const play = (src) => {
  let aux = new Audio();
  aux.src = src;
  aux.play();
  return aux;
};

export default {
  errorAlert01: () => play(errorAlert01),
  errorAlert02: () => play(errorAlert02),
  errorAlert03: () => play(errorAlert03),
  celebration01: () => play(celebration01),
  celebration02: () => play(celebration02),
};
