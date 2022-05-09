const defaultState = {
  soundBank: [
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", id: "Drum 1", key: "Q", keypress: 'q'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", id: "Drum 2", key: "W", keypress: 'w'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", id: "Drum 3", key: "E", keypress: 'e'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", id: "Piano 1", key: "A", keypress: 'a'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", id: "Piano 2", key: "S", keypress: 's'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3", id: "Piano 3", key: "D", keypress: 'd'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", id: "Clap", key: "Z", keypress: 'z'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", id: "Kick", key: "X", keypress: 'x'},
    { url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", id: "Snare", key: "C", keypress: 'c'},
  ]
}

const soundReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "EDIT":
      for (let i = 0; i < state.soundBank.length; i++) {
        if (state.soundBank[i].key === action.key) {
          console.log("found")
          state.soundBank[i].id = action.name
          state.soundBank[i].url = action.link
          console.log(state.soundBank)
        }
      }
      return state;
    default: 
      return state;
  }
}

export default soundReducer