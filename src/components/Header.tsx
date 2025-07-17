import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GrRefresh } from "react-icons/gr";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
  VscClose,
} from "react-icons/vsc";

function Header() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const checkMaximized = async () => {
      const currentWindow = getCurrentWindow();
      const maximized = await currentWindow.isMaximized();
      setIsMaximized(maximized);
    };

    checkMaximized();

    const unlisten = getCurrentWindow().listen("tauri://resize", () => {
      checkMaximized();
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, []);
  return (
    <div className="border-border flex items-center gap-12 border-b p-2">
      <div className="flex items-center gap-2">
        <button className="hover:bg-muted grid place-items-center rounded-xs p-2 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-transparent">
          <IoArrowBack />
        </button>
        <button className="hover:bg-muted grid place-items-center rounded-xs p-2 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-transparent">
          <IoArrowForward />
        </button>
        <button
          disabled
          className="hover:bg-muted grid place-items-center rounded-xs p-2 transition-colors duration-200 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <GrRefresh />
        </button>
      </div>
      <div className="flex grow">
        <div
          data-tauri-drag-region
          className={`transition-all duration-300 ease-in-out ${isSearchFocused ? "w-0 opacity-0" : "grow"}`}
        />
        <div
          className={`relative transition-all duration-300 ease-in-out ${
            isSearchFocused ? "w-full flex-1" : "w-auto"
          }`}
        >
          <FiSearch className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 transform text-sm" />
          <input
            type="text"
            className="ring-input text-muted-foreground placeholder:text-muted-foreground bg-primary-foreground w-full rounded-md py-1 pr-2 pl-8 ring-1 transition-all duration-300 ease-in-out placeholder:text-xs focus:outline-none"
            placeholder="Search files..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 self-start">
        <button
          className="hover:bg-secondary grid place-items-center rounded-xs p-2 transition-colors duration-200"
          onClick={() => getCurrentWindow().minimize()}
        >
          <VscChromeMinimize />
        </button>
        <button
          className="hover:bg-secondary grid place-items-center rounded-xs p-2 transition-colors duration-200"
          onClick={() => getCurrentWindow().toggleMaximize()}
        >
          {isMaximized ? <VscChromeRestore /> : <VscChromeMaximize />}
        </button>
        <button
          className="hover:bg-secondary grid place-items-center rounded-xs p-2 transition-colors duration-200"
          onClick={() => getCurrentWindow().close()}
        >
          <VscClose />
        </button>
      </div>
    </div>
  );
}

export default Header;
