import { Action } from '@ngrx/store';

export enum MIDIMessageActionTypes {
  NOTE_OFF = '[MIDIMessage] Note Off', // 128 + channel
  NOTE_ON = '[MIDIMessage] Note On', // 144 + channel
  POLY_PRESSURE = '[MIDIMessage] Poly Pressure', // 160 + channel
  MODULATION_WHEEL = '[MIDIMessage] Modulation Wheel', // 176 + channel, 1
  BREATH_CONTROL = '[MIDIMessage] Breath Control', // 176 + channel, 2
  AFTER_TOUCH = '[MIDIMessage] After Touch', // 176 + channel, 3
  FOOT_CONTROL = '[MIDIMessage] Foot Control', // 176 + channel, 4
  PORTAMENTO_TIME = '[MIDIMessage] Portamento Time', // 176 + channel, 5
  MAIN_VOLUME = '[MIDIMessage] Main Volume', // 176 + channel, 7
  ALL_NOTES_OFF = '[MIDIMessage] All Notes Off', // 176 + channel, 123
  PROGRAM_CHANGE = '[MIDIMessage] Program Change', // 192 + channel
  CHANNEL_PRESSURE = '[MIDIMessage] Channel Pressure', // 208 + channel
  PITCH_WHEEL = '[MIDIMessage] Pitch Wheel', // 224 + channel
  SONG_SELECT = '[MIDIMessage] Song Select', // 243
  TIMING_CLOCK = '[MIDIMessage] Timing Clock', // 248
  START = '[MIDIMessage] Start', // 250
  CONTINUE = '[MIDIMessage] Continue', // 251
  STOP = '[MIDIMessage] Stop' // 252
}

export interface MIDIMessageActionPayload {
  command: number;
  value1?: number | null;
  value2?: number | null;
  commandName?: MIDIMessageActionTypes;
  timestamp: DOMHighResTimeStamp; // epoch timestamp in milliseconds
  sourceInputName: string;
  roomId?: string | null;
  playerId: string;
}

export class NoteOffAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.NOTE_OFF;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class NoteOnAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.NOTE_ON;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}


export class PolyPressureAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.POLY_PRESSURE;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class ModulationWheelAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.MODULATION_WHEEL;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class BreathControlAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.BREATH_CONTROL;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class AfterTouchAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.AFTER_TOUCH;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class FootControlAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.FOOT_CONTROL;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class PortamentoTimeAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.PORTAMENTO_TIME;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class MainVolumeAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.MAIN_VOLUME;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class AllNotesOffAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.ALL_NOTES_OFF;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class ProgramChangeAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.PROGRAM_CHANGE;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class ChannelPressureAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.CHANNEL_PRESSURE;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class PitchWheelAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.PITCH_WHEEL;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class SongSelectAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.SONG_SELECT;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class TimingClockAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.TIMING_CLOCK;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class StartAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.START;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class ContinueAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.CONTINUE;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export class StopAction implements Action {
  type: MIDIMessageActionTypes = MIDIMessageActionTypes.STOP;

  constructor(public payload: MIDIMessageActionPayload) {
  }
}

export type MIDIMessageActions = NoteOffAction
  | NoteOnAction
  | PolyPressureAction
  | ModulationWheelAction
  | BreathControlAction
  | AfterTouchAction
  | FootControlAction
  | PortamentoTimeAction
  | MainVolumeAction
  | AllNotesOffAction
  | ProgramChangeAction
  | ChannelPressureAction
  | PitchWheelAction
  | SongSelectAction
  | TimingClockAction
  | StartAction
  | ContinueAction
  | StopAction;
