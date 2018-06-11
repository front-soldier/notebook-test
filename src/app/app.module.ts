import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NoteListComponent } from './partial/note/note-list/note-list.component';
import { NoteComponent } from './partial/note/note-list/note/note.component';
import { NoteLayoutComponent } from './partial/note/note-layout/note-layout.component';
import { AddNoteComponent } from './partial/note/add-note/add-note.component';
import { NotesService } from '../services/notes.service';
import { NoteSearchComponent } from './partial/note/note-search/note-search.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteComponent,
    NoteLayoutComponent,
    AddNoteComponent,
    NoteSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
