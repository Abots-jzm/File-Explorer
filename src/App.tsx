import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { type DiskInfo } from "./types";

function App() {
  const [disks, setDisks] = useState<DiskInfo[]>([]);

  useEffect(() => {
    async function getDiskInfo() {
      const disks = (await invoke("get_disks")) as DiskInfo[];
      setDisks(disks.reverse());
    }

    getDiskInfo();
  }, []);

  return (
    <main className="bg-background h-screen grow text-white">
      <Header />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Disk Information</h1>
        <ul>
          {disks.length === 0 ? (
            <li>No disks found</li>
          ) : (
            disks.map((disk) => (
              <li key={disk.name} className="mb-2">
                <strong>Local Disk</strong> - {disk.mountPoint} <br />
                Total Space: {disk.totalSpace} bytes, Available Space:{" "}
                {disk.availableSpace} bytes, Type: {disk.diskType}
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}

export default App;
