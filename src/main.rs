#![allow(warnings)]
use json::{array, object, JsonValue};
use serde::{Deserialize, Serialize};
use std::{env, fs};
use std::{io::Error, time::SystemTime};
use std::{path::Path, thread};

fn main() {
    let s = String::from("./target");
    let a = struct_tree(s).unwrap();
    let f = serde_json::to_string_pretty(&a).unwrap();
    println!("{}", f)

    // let f = dir_tree(s);
    // match f {
    //     Ok(file) => println!("{}", file),
    //     Err(error) => panic!("Problem reading dir: {:?}", error),
    // };
}

struct OperationMeta {
    files: u64,
    folders: u64,
}

#[derive(Serialize, Deserialize, Debug)]
struct Dirent {
    r#type: String,
    filename: String,
    path: String,
    meta: DirentMeta,
    children: Option<Vec<Dirent>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct DirentMeta {
    size: u64,
    modified: SystemTime,
    created: SystemTime,
}

fn struct_tree(root: String) -> Result<Dirent, Error> {
    let metadata = fs::metadata(&root)?;

    let mut dirent = Dirent {
        r#type: "folder".to_owned(),
        filename: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
        path: root.to_owned(),
        meta: DirentMeta {
            size: metadata.len(),
            created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
            modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
        },
        children: None,
    };

    if metadata.is_dir() {
        let mut children_vec = Vec::new();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap_or(""));
            let child = struct_tree(path)?;
            children_vec.push(child)
        }
        dirent.r#type = String::from("dir");
        dirent.children = Some(children_vec);
        Ok(dirent)
    } else {
        dirent.r#type = String::from("file");
        Ok(dirent)
    }
}

fn dir_tree(root: String) -> Result<JsonValue, Error> {
    let meta = fs::metadata(&root)?;
    let mut p = object! {
        "path": root.clone()
    };

    if meta.is_dir() {
        p["type"] = "folder".into();
        let mut children = json::JsonValue::new_array();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap());
            let child = dir_tree(path)?;
            children.push(child);
        }
        p["children"] = children
    } else {
        p["type"] = "file".into()
    }
    Ok(p)
}
