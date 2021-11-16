export interface DirectoryEntry {
  file: 0 | 1;
  name: string;
  children: null | DirectoryEntry[];
}
