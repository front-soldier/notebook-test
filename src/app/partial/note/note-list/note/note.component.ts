import { Component, Input } from '@angular/core';
import { NotesService } from '../../../../../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() note;
  constructor(private notesService: NotesService) { }

  noteClicked(note) {
    this.notesService.updateNote.emit({note: note, isNew: false});
  }
}
