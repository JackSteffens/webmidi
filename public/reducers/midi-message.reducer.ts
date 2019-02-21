import { MIDIMessageActionPayload, MIDIMessageActions, MIDIMessageActionTypes } from '../actions/midi-message.action';

export const lastMIDIMessage: MIDIMessageActionPayload = null;

export function midiMessageReducer(payload = lastMIDIMessage, action: MIDIMessageActions) {
  switch (action.type) {
    case MIDIMessageActionTypes.NOTE_ON:
      action.payload.commandName = MIDIMessageActionTypes.NOTE_ON;
      return action.payload;
    case MIDIMessageActionTypes.NOTE_OFF:
      action.payload.commandName = MIDIMessageActionTypes.NOTE_OFF;
      return action.payload;
    case MIDIMessageActionTypes.POLY_PRESSURE:
      action.payload.commandName = MIDIMessageActionTypes.POLY_PRESSURE;
      return action.payload;
    case MIDIMessageActionTypes.MODULATION_WHEEL:
      action.payload.commandName = MIDIMessageActionTypes.MODULATION_WHEEL;
      return action.payload;
    case MIDIMessageActionTypes.BREATH_CONTROL:
      action.payload.commandName = MIDIMessageActionTypes.BREATH_CONTROL;
      return action.payload;
    case MIDIMessageActionTypes.AFTER_TOUCH:
      action.payload.commandName = MIDIMessageActionTypes.AFTER_TOUCH;
      return action.payload;
    case MIDIMessageActionTypes.FOOT_CONTROL:
      action.payload.commandName = MIDIMessageActionTypes.FOOT_CONTROL;
      return action.payload;
    case MIDIMessageActionTypes.PORTAMENTO_TIME:
      action.payload.commandName = MIDIMessageActionTypes.PORTAMENTO_TIME;
      return action.payload;
    case MIDIMessageActionTypes.MAIN_VOLUME:
      action.payload.commandName = MIDIMessageActionTypes.MAIN_VOLUME;
      return action.payload;
    case MIDIMessageActionTypes.ALL_NOTES_OFF:
      action.payload.commandName = MIDIMessageActionTypes.ALL_NOTES_OFF;
      return action.payload;
    case MIDIMessageActionTypes.PROGRAM_CHANGE:
      action.payload.commandName = MIDIMessageActionTypes.PROGRAM_CHANGE;
      return action.payload;
    case MIDIMessageActionTypes.CHANNEL_PRESSURE:
      action.payload.commandName = MIDIMessageActionTypes.CHANNEL_PRESSURE;
      return action.payload;
    case MIDIMessageActionTypes.PITCH_WHEEL:
      action.payload.commandName = MIDIMessageActionTypes.PITCH_WHEEL;
      return action.payload;
    case MIDIMessageActionTypes.SONG_SELECT:
      action.payload.commandName = MIDIMessageActionTypes.SONG_SELECT;
      return action.payload;
    case MIDIMessageActionTypes.TIMING_CLOCK:
      action.payload.commandName = MIDIMessageActionTypes.TIMING_CLOCK;
      return action.payload;
    case MIDIMessageActionTypes.START:
      action.payload.commandName = MIDIMessageActionTypes.START;
      return action.payload;
    case MIDIMessageActionTypes.CONTINUE:
      action.payload.commandName = MIDIMessageActionTypes.CONTINUE;
      return action.payload;
    case MIDIMessageActionTypes.STOP:
      action.payload.commandName = MIDIMessageActionTypes.STOP;
      return action.payload;
    default:
      return payload;
  }
}
