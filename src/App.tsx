// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Header from "./components/Header";

function App() {
  // async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  // setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <main className="bg-background h-screen grow text-white">
      <Header />
    </main>
  );
}

export default App;
