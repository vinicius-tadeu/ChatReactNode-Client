import "./App.css";
import { useState } from "react";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";

export default function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);
  return (
    <div className="app">
      {
        chatVisibility ? <Chat socket={socket}/> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </div>
  );
}
