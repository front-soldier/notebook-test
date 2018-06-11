import {EventEmitter, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesModel } from '../models/NotesModel';
import { Note } from '../interfaces/Note';

@Injectable()
export class NotesService {
  note;
  notes: Note[] = [];
  updateNote = new EventEmitter();
  updateNotes = new EventEmitter();
  updateCurrentNotes = new EventEmitter();
  constructor(private http: HttpClient) {
    this.http.get('assets/notes.json').subscribe(res => {
      this.updateNotes.emit(res);
      this.updateCurrentNotes.emit(res);
      this.updateNote.emit({note: res[0], isNew: false});
    });
    this.updateNote.subscribe(res => {
      this.note = res;
    });
    this.updateNotes.subscribe(res => {
      this.notes = res;
    });
  }

  addNote() {
    const newNote: Note = new NotesModel().note;
    this.updateNote.emit({note: newNote, isNew: true});
  }

  saveNote(note: Note, isNew: boolean) {
    const notes: Note[] = this.notes.slice();
    if (isNew) {
      notes.push(note);
    } else {
      let index;
      notes.find((elm, elmIndex) => {
        if (elm.id === note.id) {
          index = elmIndex;
          return true;
        }
      });
      notes[index] = note;
    }
    this.updateNotes.emit(notes);
    this.updateCurrentNotes.emit(notes);
  }

  deleteNote(note) {
    const newNotes = this.notes.filter(elm => {
      return !(elm.id === note.id);
    });
    this.updateNotes.emit(newNotes);
    this.updateCurrentNotes.emit(newNotes);
    this.updateNote.emit({note: newNotes[0], isNew: false});
  }

  searchNotes(searchQuery) {
    if (searchQuery === '') {
      this.updateCurrentNotes.emit(this.notes);
    } else {
      searchQuery = searchQuery.toLowerCase();
      const notes: Note[] = this.notes.filter(elm => {
        if (elm.keywords !== '') {
          for (let i of elm.keywords) {
            i = i.toLowerCase();
            if (i.includes(searchQuery)) {
              return true;
            }
          }
          return false;
        } else {
          return false;
        }
      });
      this.updateCurrentNotes.emit(notes);
      if (notes.length > 0) {
        this.updateNote.emit({note: notes[0], isNew: false});
      }
    }
  }
}
