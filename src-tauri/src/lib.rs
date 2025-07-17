use std::sync::Mutex;
use sysinfo::Disks;
use tauri::Manager;

use crate::commands::get_disks;

mod commands;

struct AppData {
    disks: Disks,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(Mutex::new(AppData {
                disks: Disks::new_with_refreshed_list(),
            }));
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_disks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
