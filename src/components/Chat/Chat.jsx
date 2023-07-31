import React, { useRef, useState, useEffect } from "react";
import style from "./Chat.module.css";

export default function Chat({ socket }) {
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const getEnterKey = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  useEffect(() => {
    scrollDown();
  }, [messageList]);
  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit("message", message);
    clearInput();
    focusInput();
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };
  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className={style["chat-container"]}>
        <h1>Chat</h1>
        <div className={style["chat-body"]}>
          {messageList.map((message, index) => (
            <div
              key={index}
              className={`${style["message-container"]} ${
                message.authorId === socket.id && style["message-mine"]
              }`}
            >
              <div className={style["message-author"]}>
                <strong>{message.author}</strong>
              </div>
              <div className="message-text">{message.text}</div>
              <span>{message.data}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className={style["chat-footer"]}>
          <input
            className="inputChat"
            ref={messageRef}
            type="text"
            placeholder="Mensagem..."
            onKeyDown={(e) => {
              getEnterKey(e);
            }}
          />
          <button onClick={() => handleSubmit()}>Enviar</button>
        </div>
      </div>
    </>
  );
}
