// #![allow(warnings)]
use async_std::fs as afs;
use async_std::prelude::*;
use futures::{FutureExt, StreamExt, TryFutureExt};
use is_elevated::is_elevated;
use json::{object, JsonValue};
use serde::{Deserialize, Serialize};
use std::fs;
use std::io::Error;
use std::time::SystemTime;
use std::{path::Path, thread};
use tokio::fs as tfs;

#[tokio::main]
async fn main() {
    let s = String::from("C:\\Users\\Pat\\Desktop");

    // let s = String::from("C:\\Users\\Pat\\Documents");
    let mut op = Operation {
        estimated_size: 0,
        total_size: 0,
        folders: 0,
        files: 0,
    };

    let result = tokio_struct_tree(s, &mut op).await;
    let opened = result.unwrap();
    println!("{:?}", opened)
}

// fn main() {
//     let mut op = Operation {
//         estimated_size: 0,
//         total_size: 0,
//         folders: 0,
//         files: 0,
//     };
//     let s = String::from("C:\\Users\\Pat\\Desktop");
//     let a = new_struct_tree(s, &mut op).unwrap();
//     println!("{:?}", a)
//     // if is_elevated() {
//     //

//     //     // let mut rt = tokio::runtime::Runtime::new().unwrap();

//     //     // let s = String::from("C:\\Users\\Pat\\Documents");

//     //     // let f = dir_tree(s);
//     //     // let a = new_struct_tree(s, &mut op).unwrap();

//     //     // let a = new_struct_tree(s, &mut op);

//     //     // let f = serde_json::to_string_pretty(&a).unwrap();
//     //     // println!("{}", f);

//     //     // println!("{:?}", op);
//     //     // match f {
//     //     //     Ok(file) => println!("{:?}", file),
//     //     //     Err(error) => panic!("Problem reading dir: {:?}", error),
//     //     // };s
//     // } else {
//     //     println!("For sake of errors, We can only run with admin perms")
//     // }
// }

#[derive(Serialize, Deserialize, Debug)]
struct Operation {
    files: u64,
    folders: u64,
    estimated_size: u64,
    total_size: u64,
}

#[derive(Serialize, Deserialize, Debug)]
struct Dirent {
    r#type: String,
    name: String,
    path: String,
    meta: Option<DirentMeta>,
    children: Option<Vec<Dirent>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct DirentMeta {
    size: u64,
    modified: SystemTime,
    created: SystemTime,
}

#[allow(dead_code)]
fn struct_tree(root: String) -> Result<Dirent, Error> {
    let metadata = fs::metadata(&root)?;

    let mut dirent = Dirent {
        r#type: String::new(),
        name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
        path: root.to_owned(),
        meta: Some(DirentMeta {
            size: metadata.len(),
            created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
            modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
        }),
        children: None,
    };

    if metadata.is_dir() {
        let mut children_vec = Vec::new();
        let mut handle_vec = Vec::new();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap_or(""));
            let handle = thread::spawn(move || struct_tree(path).unwrap());
            // let child = handle.join().unwrap();
            // struct_tree(path)?;
            // let child = struct_tree(path)?;
            handle_vec.push(handle)
        }
        dirent.r#type = String::from("dir");
        for handle in handle_vec {
            let x = handle.join().unwrap();
            children_vec.push(x)
        }
        dirent.children = Some(children_vec);
        Ok(dirent)
    } else {
        dirent.r#type = String::from("file");
        Ok(dirent)
    }
}

#[allow(dead_code)]
fn single_thread_struct_tree(root: String) -> Result<Dirent, Error> {
    let metadata = fs::metadata(&root)?;

    let mut dirent = Dirent {
        r#type: String::new(),
        name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
        path: root.to_owned(),
        meta: Some(DirentMeta {
            size: filesize::file_real_size_fast(&root, &metadata)?,
            created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
            modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
        }),
        children: None,
    };

    if metadata.is_dir() {
        let mut children_vec = Vec::new();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap_or(""));
            let child = single_thread_struct_tree(path)?;
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

fn new_struct_tree(root: String, op: &mut Operation) -> Result<Dirent, Error> {
    let mut a: Vec<&str> = root.split("\\").collect();
    let mut fname = a.pop().unwrap_or("");
    if fname == "" {
        fname = a.pop().unwrap_or("")
    }

    let mut dirent = Dirent {
        r#type: "file".to_string(),
        name: String::from(fname),
        path: root.to_owned(),
        children: None,
        meta: None,
    };

    if let Ok(metadata) = fs::metadata(&root) {
        let size = filesize::file_real_size_fast(&root, &metadata)?;
        op.total_size += size;

        dirent.meta = Some(DirentMeta {
            size: size,
            created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
            modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
        });

        if metadata.is_dir() {
            let mut children_vec = Vec::new();
            for entry in fs::read_dir(&root)? {
                let dir_entry = entry?;
                let path = String::from(dir_entry.path().to_str().unwrap_or(""));
                let child = new_struct_tree(path, op)?;
                children_vec.push(child)
            }
            dirent.r#type = String::from("dir");
            dirent.children = Some(children_vec);
            op.folders += 1;
        } else {
            op.files += 1;
        }
    } else {
        println!("{} is unable to get metadata", &root);
        op.files += 1;
    }
    Ok(dirent)
}

use async_recursion::async_recursion;

#[async_recursion]
async fn tokio_struct_tree(root: String, op: &mut Operation) -> Result<Dirent, Error> {
    let metadata = tfs::metadata(&root).await?;
    let size = filesize::file_real_size_fast(&root, &metadata)?;

    op.total_size += size;

    let mut dirent = Dirent {
        r#type: String::new(),
        name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
        path: root.to_owned(),
        meta: Some(DirentMeta {
            size: filesize::file_real_size_fast(&root, &metadata)?,
            created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
            modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
        }),
        children: None,
    };

    if metadata.is_dir() {
        // folder
        let mut children_vec = Vec::new();
        let mut entries = tfs::read_dir(&root).await?;

        while let Some(entry) = entries.next_entry().await? {
            // Here, `entry` is a `DirEntry`.
            let path = String::from(entry.path().to_str().unwrap_or(""));
            let child = tokio_struct_tree(path, op).await?;
            children_vec.push(child);
        }
        dirent.r#type = String::from("dir");
        dirent.children = Some(children_vec);
        op.folders += 1;
    } else {
        // file
        op.files += 1;
    }

    // let mut entries = tfs::read_dir(root).await?;
    // while let Some(entry) = entries.next_entry().await? {
    //     // Here, `entry` is a `DirEntry`.
    //     println!("{:?}", entry.file_name());
    // }
    Ok(dirent)
}

#[allow(dead_code)]
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
            children.push(child).unwrap();
        }
        p["children"] = children
    } else {
        p["type"] = "file".into()
    }
    Ok(p)
}

#[allow(dead_code)]
fn get_filename_from_path(path: &String) -> String {
    let mut a: Vec<&str> = path.split("\\").collect();
    let mut fname = a.pop().unwrap_or("");
    if fname == "" {
        fname = a.pop().unwrap_or("")
    }
    String::from(fname)
}

async fn async_std_struct_tree(root: String, op: &mut Operation) {
    let root_path = root.clone();
    afs::metadata(root_path).then(|meta| async move {
        if let Ok(metadata) = meta {
            // let metadata = meta.unwrap();

            let fname = get_filename_from_path(&root);

            let mut dirent = Dirent {
                r#type: "file".to_string(),
                name: fname.to_string(),
                path: root.to_owned(),
                children: None,
                meta: None,
            };

            let size = filesize::file_real_size_fast(&root, &metadata).unwrap_or(0);
            op.total_size += size;

            dirent.meta = Some(DirentMeta {
                size,
                created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
                modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
            });

            if metadata.is_dir() {
                dirent.r#type = "dir".to_string();
                op.folders += 1;

                // let mut children_vec = Vec::new();
                // for entry in fs::read_dir(&root)? {
                //     let dir_entry = entry?;
                //     let path = String::from(dir_entry.path().to_str().unwrap_or(""));
                //     let child = new_struct_tree(path, op)?;
                //     children_vec.push(child)
                // }

                // let f = afs::read_dir(&root).await;
                // dirent.children = Some(children_vec);
            } else {
                op.files += 1;
            }
        } else {
            println!("{} is unable to get metadata", &root);
            op.files += 1;
        }
    });
    // let x = afs::metadata(root_path).and_then(|metadata| async move {

    //     return Ok(dirent);
    // });
}
