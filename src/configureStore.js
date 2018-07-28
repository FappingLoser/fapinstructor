import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";

const defaultConfig = {
  version: 2,
  tumblrId: "fapstergifs, allcowgirl, mar-cuss-blowjob-gifs, pornonmotion[blowjob,cumshot]",
  failedIds: [],
  gifs: true,
  redditId: "60fpsporn, porninaminute",
  gifs: false,
  pictures: false,
  videos: true,
  slideDuration: 10, // sec
  enableVoice: true,
  enableMoans: true,
  videoMuted: false,
  finalOrgasmAllowed: true,
  finalOrgasmDenied: false,
  finalOrgasmRuined: false,
  finalOrgasmRandom: false,
  minimumGameTime: 5, // min
  maximumGameTime: 20, // min
  minimumEdges: 0,
  minimumRuinedOrgasms: 0,
  maximumRuinedOrgasms: 0,
  maximumOrgasms: 1,
  postOrgasmTorture: false,
  postOrgasmTortureMinimumTime: 10,
  postOrgasmTortureMaximumTime: 90,
  edgeCooldown: 5, // sec
  edgeFrequency: 0, // percent
  ruinCooldown: 20, // sec
  slowestStrokeSpeed: 0.25, // sec
  fastestStrokeSpeed: 5, // sec
  initialGripStrength: GripStrengthEnum.Normal,
  actionFrequency: 5, // sec
  tasks: {
    doubleStrokes: true,
    halvedStrokes: true,
    teasingStrokes: true,
    accelerationCycles: true,
    randomBeat: true,
    randomStrokeSpeed: true,
    redLightGreenLight: true,
    clusterStrokes: true,
    dominant: true,
    nondominant: true,
    headOnly: true,
    shaftOnly: true,
    overhandGrip: true,
    bothHands: true,
    gripAdjustments: true,
    bindCockBalls: true,
    rubberBands: true,
    clothespins: true,
    ballSlaps: true,
    squeezeBalls: true,
    headPalming: true,
    icyHot: true,
    toothpaste: true,
    breathPlay: true,
    scratching: true,
    flicking: true,
    cbtIce: true,
    precum: true,
    buttplug: true,
    pickYourPoison: true
  }
};

export default () => {
  store.config = defaultConfig;
  return store;
};
