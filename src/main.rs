#![allow(warnings)]
use json::{array, object, JsonValue};
use std::io::Error;
use std::thread;
use std::{env, fs};

fn main() {
    let s = String::from("C:\\Users\\Pat\\Desktop\\testdir");
    let f = dir_tree(s);
    match f {
        Ok(file) => println!("{}", file),
        Err(error) => panic!("Problem reading dir: {:?}", error),
    };
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
