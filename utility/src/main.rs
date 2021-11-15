use serde::{Deserialize, Serialize};
use std::env;
use std::fs;
use std::io::Error;
use std::io::Write;
use std::path::Path;

#[derive(Serialize, Deserialize, Debug)]
struct OperationMetadata {
    total_files: u128,
    total_folders: u128,
    total_entries: u128,
    total_size: String,
}
#[derive(Serialize, Deserialize, Debug)]
struct Operation {
    list: Dirent,
    metadata: OperationMetadata,
}

#[derive(Serialize, Deserialize, Debug)]
struct Dirent {
    file: i8,
    name: String,
    children: Option<Vec<Dirent>>,
}

// 1. Estimate size before starting recusion
// 2. Create struct to icrement counter for progress based on size
// 3. Export operation + metadata
// 4. Fields needed (ModifiedTime,CreatedTime,FullPath,Name,Size)

fn main() {
    let args: Vec<String> = env::args().collect();
    let path = &args[1];

    match dir_tree(path.to_string()) {
        Ok(result) => {
            let json = serde_json::to_string_pretty(&result).unwrap();

            let mut file = std::fs::File::create("filelist.json").expect("create failed");
            file.write_all(json.as_bytes()).expect("write failed");
        }
        Err(e) => println!("{:?}", e),
    };
}

fn dir_tree(root: String) -> Result<Dirent, Error> {
    let metadata = fs::metadata(&root)?;
    let filename = Path::new(&root)
        .file_name()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string();

    if metadata.is_dir() {
        let mut children = Vec::new();
        for entry in fs::read_dir(&root)? {
            let dir_entry = entry?;
            let path = String::from(dir_entry.path().to_str().unwrap_or(""));
            let child = dir_tree(path)?;
            children.push(child)
        }
        let children = Some(children);

        Ok(Dirent {
            children,
            name: filename,
            file: 0, // false
        })
    } else {
        Ok(Dirent {
            children: None,
            name: filename,
            file: 1, // true
        })
    }
}
