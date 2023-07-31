import React, { useRef } from "react";
import "./Join.css";
import io from "socket.io-client";

export default function Join({setChatVisibility, setSocket}) {
  const usernameRef = useRef();

  const getEnterKey = (e) =>{
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    if (!username.trim()) return;
    const socket = await io.connect("http://localhost:3001");
    socket.emit('set_username', username)
    console.log("Submit");
    setSocket(socket);
    setChatVisibility(true);
  };

  return (
    <>
      <div className="joinWrapper">
        <h1>Join</h1>
        <input
          className="inputJoin"
          ref={usernameRef}
          type="text"
          placeholder="Nome de usuário..."
          onKeyDown={(e) =>{getEnterKey(e)}}
        />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Entrar
        </button>
      </div>
    </>
  );
}
