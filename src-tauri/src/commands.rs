use std::sync::Mutex;

use serde::Serialize;
use sysinfo::DiskKind;
use tauri::Manager;

use crate::AppData;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DiskInfo {
    name: String,
    mount_point: String,
    total_space: u64,
    available_space: u64,
    disk_type: String,
}

#[tauri::command]
pub fn get_disks(app: tauri::AppHandle) -> Vec<DiskInfo> {
    let data = app.state::<Mutex<AppData>>();
    let mut data = data.lock().unwrap();
    let disks = &mut data.disks;

    for disk in disks.iter_mut() {
        disk.refresh();
    }

    disks
        .iter()
        .map(|d| DiskInfo {
            name: d.name().to_string_lossy().into_owned(),
            mount_point: d.mount_point().to_string_lossy().into_owned(),
            total_space: d.total_space(),
            available_space: d.available_space(),
            disk_type: match d.kind() {
                DiskKind::HDD => "HDD",
                DiskKind::SSD => "SSD",
                DiskKind::Unknown(_) => "Unknown",
            }
            .to_string(),
        })
        .collect()
}
