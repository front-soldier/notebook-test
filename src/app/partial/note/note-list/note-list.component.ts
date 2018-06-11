import {Component, OnInit} from '@angular/core';
import { NotesService } from '../../../../services/notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes = [];
  activeNote;
  constructor(private notesService: NotesService) { }
  ngOnInit() {
    this.notesService.updateCurrentNotes.subscribe(res => {
      this.notes = res;
    });
    this.notesService.updateNote.subscribe(res => {
      this.activeNote = this.notes.indexOf(res.note);
    });
  }
}
