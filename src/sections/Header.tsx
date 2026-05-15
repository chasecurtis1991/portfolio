"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="dot" />
          CHASE_CURTIS
          <span style={{ color: "var(--fg-3)", marginLeft: 6 }} />
        </div>
        <nav className="nav">
          <a href="#work" data-magnetic>
            <span className="idx">01</span>Work
          </a>
          <a href="#about" data-magnetic>
            <span className="idx">02</span>About
          </a>
          <a href="#stack" data-magnetic>
            <span className="idx">03</span>Stack
          </a>
          <a href="#words" data-magnetic>
            <span className="idx">04</span>Words
          </a>
          <a href="#contact" data-magnetic>
            <span className="idx">05</span>Contact
          </a>
        </nav>
        <div className="topbar-right">
          <span className="pill">
            <span className="led" />
            AVAILABLE
          </span>
          <span
            style={{ fontVariantNumeric: "tabular-nums" }}
            suppressHydrationWarning
          >
            {time || "--:--:--"} · KNX
          </span>
        </div>
      </div>
    </header>
  );
}
