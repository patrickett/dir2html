// #![allow(warnings)]
#![feature(cell_update)]

use async_std::{fs as afs, sync::Mutex};
// use async_std::prelude::*;
use futures::{FutureExt, TryStreamExt};
// use is_elevated::is_elevated;
use json::{object, JsonValue};
use serde::{Deserialize, Serialize};
use std::io::Error;
use std::path::Path;
use std::time::SystemTime;
use std::{borrow::BorrowMut, fs};
use std::{
    cell::{Cell, RefCell},
    sync::Arc,
};
use tokio::fs as tfs;

#[tokio::main]
async fn main() {
    let s = String::from("C:\\Users\\Pat\\Desktop\\testdir");

    // let s = String::from("C:\\Users\\Pat\\Documents");
    // let oper = Cell::new(Operation {
    //     estimated_size: 0,
    //     total_size: 0,
    //     folders: 0,
    //     files: 0,
    // });
    let mut op = Details {
        estimated_size: RefCell::new(0),
        total_size: RefCell::new(0),
        folders: RefCell::new(0),
        files: RefCell::new(0),
    };

    let my_data = Mutex::new(op);
    let my_data = Arc::new(my_data);

    let result = async_std_struct_tree(s, my_data).await;
    let opened = result.unwrap();
    println!("{:?}", opened)
}

// use std::fs::File;
// use std::io::prelude::*;

// fn main() {
// let op = Details {
//     files: Cell::new(0),
//     folders: Cell::new(0),
//     estimated_size: Cell::new(0),
//     total_size: Cell::new(0),
// };
// let s = String::from("C:\\Users\\Pat\\Desktop\\testdir");

// let f = async_std_struct_tree(s, op);

// let mut op = Operation {
//     estimated_size: 0,
//     total_size: 0,
//     folders: 0,
//     files: 0,
// };
// let s = String::from("C:\\Users\\Pat\\Desktop");
// let a = new_struct_tree(s, &mut op).unwrap();
// let list = FileList {
//     operation: op,
//     root: a,
// };

// let f = serde_json::to_string_pretty(&list).unwrap();
// let mut file = File::create("file_list.json").unwrap();
// let g = file.write_all(f.as_bytes()).unwrap();
// println!("{}", f);
// println!("{:?}", a)
// if is_elevated() {
//

//     // let mut rt = tokio::runtime::Runtime::new().unwrap();

//     // let s = String::from("C:\\Users\\Pat\\Documents");

//     // let f = dir_tree(s);
//     // let a = new_struct_tree(s, &mut op).unwrap();

//     // let a = new_struct_tree(s, &mut op);

// println!("{:?}", op);
//     // match f {
//     //     Ok(file) => println!("{:?}", file),
//     //     Err(error) => panic!("Problem reading dir: {:?}", error),
//     // };s
// } else {
//     println!("For sake of errors, We can only run with admin perms")
// }
// }

#[derive(Serialize, Deserialize, Debug)]
struct FileList {
    operation: Operation,
    root: Dirent,
}

#[derive(Serialize, Deserialize, Debug)]
struct Details {
    files: RefCell<u64>,
    folders: RefCell<u64>,
    estimated_size: RefCell<u64>,
    total_size: RefCell<u64>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Operation {
    files: u64,
    folders: u64,
    estimated_size: u64,
    total_size: u64,
}

impl Operation {
    fn increment_file_count(&mut self) {
        self.files += 1
    }

    fn increment_folder_count(&mut self) {
        self.folders += 1
    }

    fn update_total_size(&mut self, added_total_size: u64) {
        self.total_size += added_total_size;
    }
    // fn update_estimated_size(&mut self, added_estimated_size: u64) {
    //     self.estimated_size
    // }
}

#[derive(Serialize, Deserialize, Debug)]
struct Dirent {
    r#type: String,
    name: String,
    path: String,
    size: u64,
    modified: u64,
    created: u64,
    children: Option<Vec<Dirent>>,
}

#[derive(Serialize, Deserialize, Debug)]
struct DirentMeta {
    size: u64,
    modified: SystemTime,
    created: SystemTime,
}

#[allow(dead_code)]
// fn struct_tree(root: String) -> Result<Dirent, Error> {
//     let metadata = fs::metadata(&root)?;

//     let mut dirent = Dirent {
//         r#type: String::new(),
//         name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
//         path: root.to_owned(),
//         size: metadata.len(),
//         created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
//         modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),
//         children: None,
//     };

//     if metadata.is_dir() {
//         let mut children_vec = Vec::new();
//         let mut handle_vec = Vec::new();
//         for entry in fs::read_dir(&root)? {
//             let dir_entry = entry?;
//             let path = String::from(dir_entry.path().to_str().unwrap_or(""));
//             let handle = thread::spawn(move || struct_tree(path).unwrap());
//             // let child = handle.join().unwrap();
//             // struct_tree(path)?;
//             // let child = struct_tree(path)?;
//             handle_vec.push(handle)
//         }
//         dirent.r#type = String::from("dir");
//         for handle in handle_vec {
//             let x = handle.join().unwrap();
//             children_vec.push(x)
//         }
//         dirent.children = Some(children_vec);
//         Ok(dirent)
//     } else {
//         dirent.r#type = String::from("file");
//         Ok(dirent)
//     }
// }

// #[allow(dead_code)]
// fn single_thread_struct_tree(root: String) -> Result<Dirent, Error> {
//     let metadata = fs::metadata(&root)?;

//     let mut dirent = Dirent {
//         r#type: String::new(),
//         name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
//         path: root.to_owned(),
//         size: filesize::file_real_size_fast(&root, &metadata)?,
//         created: metadata.created().unwrap_or(SystemTime::UNIX_EPOCH),
//         modified: metadata.modified().unwrap_or(SystemTime::UNIX_EPOCH),

//         children: None,
//     };

//     if metadata.is_dir() {
//         let mut children_vec = Vec::new();
//         for entry in fs::read_dir(&root)? {
//             let dir_entry = entry?;
//             let path = String::from(dir_entry.path().to_str().unwrap_or(""));
//             let child = single_thread_struct_tree(path)?;
//             children_vec.push(child)
//         }
//         dirent.r#type = String::from("dir");
//         dirent.children = Some(children_vec);
//         Ok(dirent)
//     } else {
//         dirent.r#type = String::from("file");
//         Ok(dirent)
//     }
// }

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
        size: 0,
        created: 0,
        modified: 0,
    };

    if let Ok(metadata) = fs::metadata(&root) {
        let size = filesize::file_real_size_fast(&root, &metadata)?;
        op.total_size += size;

        dirent.size = size;
        dirent.created = metadata
            .created()
            .unwrap_or(SystemTime::UNIX_EPOCH)
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        dirent.modified = metadata
            .modified()
            .unwrap_or(SystemTime::UNIX_EPOCH)
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs();

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
#[allow(dead_code)]
async fn tokio_struct_tree(root: String, op: &mut Operation) -> Result<Dirent, Error> {
    let metadata = tfs::metadata(&root).await?;
    let size = filesize::file_real_size_fast(&root, &metadata)?;

    op.total_size += size;

    let mut dirent = Dirent {
        r#type: String::new(),
        name: String::from(Path::new(&root).file_name().unwrap().to_str().unwrap_or("")),
        path: root.to_owned(),
        size: filesize::file_real_size_fast(&root, &metadata)?,
        created: metadata
            .created()
            .unwrap_or(SystemTime::UNIX_EPOCH)
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
        modified: metadata
            .modified()
            .unwrap_or(SystemTime::UNIX_EPOCH)
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
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

async fn async_std_struct_tree(
    root: String,
    op: Arc<async_std::sync::Mutex<Details>>,
) -> Result<Dirent, Error> {
    let root_path = root.clone();
    let fname = get_filename_from_path(&root);

    let mut dirent = Dirent {
        r#type: "file".to_string(),
        name: fname.to_string(),
        path: root.to_owned(),
        children: None,
        size: 0,
        modified: 0,
        created: 0,
    };

    let main = afs::metadata(root_path).then(|meta| async move {
        if let Ok(metadata) = meta {
            dirent.size = filesize::file_real_size_fast(&root, &metadata).unwrap_or(0);
            dirent.created = metadata
                .created()
                .unwrap_or(SystemTime::UNIX_EPOCH)
                .duration_since(SystemTime::UNIX_EPOCH)
                .unwrap()
                .as_secs();
            dirent.modified = metadata
                .modified()
                .unwrap_or(SystemTime::UNIX_EPOCH)
                .duration_since(SystemTime::UNIX_EPOCH)
                .unwrap()
                .as_secs();

            let size = filesize::file_real_size_fast(&root, &metadata).unwrap_or(0);
            // op.update_total_size(size);
            // op.total_size.update(|x| x + size);
            // op.total_size += size;
            // *op.total_size.get_mut() += size;

            if metadata.is_dir() {
                dirent.r#type = "dir".to_string();
                // op.folders.update(|x| x + 1);
                // op.increment_folder_count();
                // op.folders += 1;
                // *op.folders.get_mut() += 1;

                let children_result = afs::read_dir(&root).then(|res| async {
                    let mut children_vec = Vec::new();
                    let read_dir = res.unwrap();
                    //     // finish stream then check
                    //     // work as finding items within stream

                    let finished = read_dir.try_for_each_concurrent(1, |dir_entry| async move {
                        let path = String::from(dir_entry.path().to_str().unwrap_or(""));
                        let fut = async_std_struct_tree(path, op);
                        let result = fut.await;
                        let child = result.unwrap();
                        children_vec.push(child);
                        Ok(())
                    });
                });

                // for entry in afs::read_dir(&root).await {
                //     let dir_entry = entry?;
                //     let path = String::from(dir_entry.path().to_str().unwrap_or(""));
                //     let child = new_struct_tree(path, op)?;
                //     children_vec.push(child)
                // }

                // let f = afs::read_dir(&root).await;
                // dirent.children = Some(children_vec);
            } else {
                // op.files.update(|x| x + 1);
                // *op.files.get_mut() += 1;

                // op.increment_file_count();
                // op.files += 1;
            }
        } else {
            println!("{} is unable to get metadata", &root);
            // op.files += 1;
            // op.increment_file_count();
            // *op.files.get_mut() += 1;
            // op.files.update(|x| x + 1);
        }
        dirent
    });

    Ok(main.await)

    // let x = afs::metadata(root_path).and_then(|metadata| async move {
    //     return Ok(dirent);
    // });

    // Ok(dirent)
}
