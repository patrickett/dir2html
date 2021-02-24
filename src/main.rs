#![allow(warnings)]
use json::{array, object, JsonValue};
use serde::{Deserialize, Serialize};
use std::thread;
use std::{env, fs};
use std::{io::Error, time::SystemTime};

fn main() {
    let s = String::from(".");
    let a = struct_tree(s).unwrap();
    let f = serde_json::to_string_pretty(&a).unwrap();
    println!("{}", f)

    // let f = dir_tree(s);
    // match f {
    //     Ok(file) => println!("{}", file),
    //     Err(error) => panic!("Problem reading dir: {:?}", error),
    // };
}

#[derive(Serialize, Deserialize, Debug)]
struct Dirent {
    r#type: String,
    path: String,
    children: Option<Vec<Dirent>>,
    meta: DirentMeta,
}

#[derive(Serialize, Deserialize, Debug)]
struct DirentMeta {
    size: u64,
    modified: SystemTime,
    created: SystemTime,
}

fn struct_tree(root: String) -> Result<Dirent, Error> {
    let metadata = fs::metadata(&root)?;

    let meta = DirentMeta {
        size: metadata.len(),
        created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
        modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
    };

    if metadata.is_dir() {
        let mut children_vec = Vec::new();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap());
            let child = struct_tree(path)?;
            children_vec.push(child)
        }
        let folder = Dirent {
            path: root.to_owned(),
            r#type: "folder".to_owned(),
            children: Some(children_vec),
            meta,
        };
        Ok(folder)
    } else {
        let file = Dirent {
            path: root.to_owned(),
            r#type: "file".to_owned(),
            children: None,
            meta,
        };
        Ok(file)
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
