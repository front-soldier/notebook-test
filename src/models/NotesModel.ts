import { Note } from '../interfaces/Note';

export class NotesModel {
  public note: Note = <Note> {
    caption: 'Caption',
    text: '',
    date: '',
    id: (Math.floor(Math.random() * 1000)).toString()
  };
}
