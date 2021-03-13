import React from "react";
import { Table, Link } from "@geist-ui/react";
import File from "@geist-ui/react-icons/file";
import Folder from "@geist-ui/react-icons/folder";
import styles from "../css/index.module.css";
import { DirentJson, FileList } from "../App";
import filesize from "filesize";

export default function DirListing({ data }: { data: FileList }) {
  let tableData = data.root.children!.map((child: any) => {
    if (child.type === "dir") {
      child.name1 = (
        <Link
          color
          underline
          className={styles.iconText}
          href={`${window.location}/${child.name}`}
        >
          <Folder className={styles.m1} size={20} />
          {child.name}
        </Link>
      );
    } else {
      child.name1 = (
        <div className={styles.iconText}>
          <File className={styles.m1} size={20} />
          <p>{child.name}</p>
        </div>
      );
    }

    child.modified = new Date(child.modified).toLocaleDateString();
    child.size1 = filesize(child.size);
    return child;
  });
  const sorted: DirentJson[] = tableData.sort((a, b) => {
    let fa = a.type,
      fb = b.type;

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return (
    <div>
      <Table data={sorted}>
        <Table.Column prop="name1" label="name" />
        <Table.Column prop="size1" label="size" />
        <Table.Column prop="modified" label="modified" />
        <Table.Column prop="path" label="path" />
      </Table>
    </div>
  );
}
