import store from "store";
import moment from "moment";
import { randomStrokeSpeed } from "./utils/strokeSpeed";
import { StrokeStyleEnum } from "game/enums/StrokeStyle";

export default () => {
  store.game = {
    startTime: new moment(),
    pictures: [],
    pictureIndex: -1,
    mediaPlayerUrl: null,
    mediaFrozen: false,
    strokeSpeed: randomStrokeSpeed(),
    bookmarks: [],
    gripStrength: store.config.initialGripStrength,
    rubberBands: 0,
    clothespins: 0,
    cockAndBallsBound: false,
    ruins: 0,
    edges: 0,
    orgasms: 0,
    strokes: 0,
    strokeWave: [],
    strokeStyle: StrokeStyleEnum.Dominant,
    buttPlugInserted: false
  };
};
