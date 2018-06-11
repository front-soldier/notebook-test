import {Component, OnInit, ViewChild} from '@angular/core';
import { NotesService } from '../../../../services/notes.service';
import { Note } from '../../../../interfaces/Note';
import {NotesModel} from '../../../../models/NotesModel';

@Component({
  selector: 'app-note-layout',
  templateUrl: './note-layout.component.html',
  styleUrls: ['./note-layout.component.css']
})
export class NoteLayoutComponent implements OnInit {
  @ViewChild('form') form;
  note: Note = new NotesModel().note;
  isNew;
  constructor(private notesService: NotesService) { }
  ngOnInit() {
    this.notesService.updateNote.subscribe(res => {
      this.resetPage();
      this.note = JSON.parse(JSON.stringify(res.note)); // deep copy
      this.isNew = res.isNew;
      if (Array.isArray(this.note.keywords)) {
        this.note.keywords = this.note.keywords.join(', ');
      }
    });
  }
  saveNote(event) {
    event.preventDefault();
    console.log(this.form.controls.caption.value);
    if (this.form.invalid || this.form.controls.caption.value.trim() === '' || this.form.controls.keywords.value.trim() === '') {
      this.verifyPage();
      return;
    }
    const note = JSON.parse(JSON.stringify(this.note));
    if (this.note.keywords !== '') {
      let keywords: any = note.keywords.replace(/ /g, '');
      keywords = keywords.split(',');
      note.keywords = keywords;
    }
    this.notesService.saveNote(note, this.isNew);
    if (this.isNew) {
      this.isNew = false;
    }
  }
  deleteNote(event) {
    event.preventDefault();
    this.notesService.deleteNote(this.note);
  }
  resetPage() {
    this.form.controls.caption.markAsPristine();
    this.form.controls.caption.markAsUntouched();
    this.form.controls.keywords.markAsPristine();
    this.form.controls.keywords.markAsUntouched();
  }
  verifyPage() {
    this.form.controls.caption.markAsDirty();
    this.form.controls.keywords.markAsDirty();
  }
}
