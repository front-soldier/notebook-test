import { Component } from '@angular/core';
import { NotesService } from '../../../../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {

  constructor(private notesService: NotesService) { }
  addNote() {
    this.notesService.addNote();
  }
}
