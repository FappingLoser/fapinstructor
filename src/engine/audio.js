let context;
let oscillator;
let gainNode;

let contextCreated = false;
const createAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!window.context) {
    context = new AudioContext();
    window.context = context;

    try {
      gainNode = context.createGain();
      gainNode.gain.value = 0;

      oscillator = context.createOscillator();
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      oscillator.start(0);
    } catch (e) {
      console.log(e);
    }
  }
  contextCreated = true;
};

const fetchAudioFile = async url => {
  if (!contextCreated) {
    createAudioContext();
  }

  let buffer;

  if (context && context.decodeAudioData) {
    buffer = await new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.responseType = "arraybuffer";
      request.onerror = reject;
      request.onload = () => {
        resolve(context.decodeAudioData(request.response));
      };
      request.send();
    });
  } else {
    // ie11 fallback
    buffer = new Audio(url);
  }

  return buffer;
};

let tickCount = 0;
let previousRhythm = 0;
const playTick = rhythm => {
  if (!contextCreated) {
    createAudioContext();
  }

  if (!oscillator || !gainNode) {
    return false;
  }

  let frequency;

  if (previousRhythm === 0 || previousRhythm !== rhythm || rhythm < 3) {
    tickCount = 0;
  }

  if (tickCount === 3) {
    frequency = 600;
    tickCount = 0;
  } else {
    tickCount++;
    frequency = 300;
  }
  previousRhythm = rhythm;

  var now = context.currentTime;

  oscillator.frequency.setValueAtTime(frequency, now);

  // Ramp up the gain so we can hear the sound.
  // We can ramp smoothly to the desired value.
  // First we should cancel any previous scheduled events that might interfere.
  gainNode.gain.cancelScheduledValues(now);
  // Anchor beginning of ramp at current value.
  gainNode.gain.setValueAtTime(gainNode.gain.value, now);
  gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.001);
  gainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.11);

  return true;
};

const play = async file => {
  if (!contextCreated) {
    createAudioContext();
  }

  const buffer = await file;

  if (context) {
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    if (!source.start) source.start = source.noteOn;
    source.start(0);
  } else {
    const promise = buffer.play();
    if (promise) {
      promise.catch(error =>
        console.error("Failed to play audio fallback", error)
      );
    }
  }
};

export { fetchAudioFile, createAudioContext, playTick };
export default play;
