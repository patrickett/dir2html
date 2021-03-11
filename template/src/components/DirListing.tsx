import React from "react";
import { Table, Link } from "@geist-ui/react";
import "../css/index.css";

export default function DirListing() {
  const data = [
    {
      name: (
        <Link color underline>
          components/
        </Link>
      ),
      path: "C://Users/pat/components",
      size: "10.2MB",
      modified: "-",
    },
    {
      name: "package.json",
      path: "C://Users/pat/package.json",
      size: "12kb",
      modified: "2017-04-18",
    },
    {
      name: "readme.md",
      path: "C://Users/pat/readme.md",
      size: "34.4kb",
      modified: "2017-04-18",
    },
  ];

  return (
    <div>
      <Table data={data}>
        <Table.Column prop="name" label="name" />
        <Table.Column prop="size" label="size" />
        <Table.Column prop="modified" label="modified" />
        <Table.Column prop="path" label="path" />
      </Table>
    </div>
  );
}
