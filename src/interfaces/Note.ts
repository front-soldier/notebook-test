export interface Note {
  caption: string;
  text: string | undefined;
  keywords?: string[] | string;
  date: string | undefined;
  id: string;
}
