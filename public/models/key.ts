import { CommandService } from '../services/command.service';

export class Key {
  note: string;
  number: number;
  octave: number;
  sharp: boolean;
  active: boolean;

  constructor(note: number | string) {
    if (typeof note === 'number') {
      this.number = note;
      note = CommandService.getNote(note);
    }

    if (typeof note === 'string') {
      this.note = note;
      this.number = this.number ? this.number : CommandService.getNumber(note);
      this.octave = this.getOctave(note);
      this.sharp = this.isSharp(note);
      this.active = false;
    } else {
      throw new TypeError('No note given');
    }
  }

  private isSharp(note): boolean {
    return note.includes('#');
  }

  private getOctave(note): number {
    let octave = Number(note.match(new RegExp('\\d', 'g'))[0]);
    return octave ? octave : 0;
  }
}
