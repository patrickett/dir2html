import { DirectoryEntry } from "../../types/filelist";
export default class Dirent {
  name = "";
  file = true;
  children: null | Dirent[] = null;

  constructor(json: DirectoryEntry) {
    this.name = json.name;
    this.file = Boolean(json.file);

    this.children = this.isFolder
      ? json.children?.map((c) => new Dirent(c)) ?? null
      : null;
  }

  search(re: RegExp, dirent = this) {
    dirent.name.match(re);
  }

  get ext() {
    return this.isFile && this.name.includes(".")
      ? this.name.split(".").reverse()[0]
      : "";
  }
  get hasChildren() {
    return this.isFolder && this.children && this.children.length > 1
      ? true
      : false;
  }
  get isFolder() {
    return !this.file;
  }
  get isFile() {
    return this.file;
  }
}
