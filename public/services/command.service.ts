import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  minNote: number;
  maxNote: number;
  baseNotes: Array<string>;
  static notes: Map<number, string>; // keys index ranging from 0 to 127, base note + octave like F#4

  constructor() {
    this.minNote = 0;
    this.maxNote = 127;
    this.baseNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    this.initNotes();
    console.log('NOTES  :', CommandService.notes);
  }

  public static getNote(noteIndex: number): string {
    return CommandService.notes.get(noteIndex);
  }

  public static getNumber(searchNote: string): number {
    let notesAsArray = Array.from(CommandService.notes.values());
    let foundNote = notesAsArray.find((iterateNote) => {
      return iterateNote === searchNote;
    });
    return notesAsArray.indexOf(foundNote);
  }

  initNotes(): void {
    CommandService.notes = new Map();
    for (let noteIndex = this.minNote; noteIndex <= this.maxNote; noteIndex++) {
      CommandService.notes.set(noteIndex, (this.getBaseNote(noteIndex) + this.getOctave(noteIndex)));
    }
  }

  getBaseNote(noteIndex): string {
    let mod = noteIndex % 12;
    return this.baseNotes[mod];
  }

  getOctave(noteIndex): string {
    let num = Math.floor((noteIndex - this.minNote) / 12);
    return num === 0 ? '0' : String(num);
  }
}
