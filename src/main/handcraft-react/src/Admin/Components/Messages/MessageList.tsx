import React, { useEffect, useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import { Link } from "react-router-dom";

const MessageList = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageError, setMessageError] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      const url = "http://localhost:8080/api/messages?sort=createdAt,desc";
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const requestJson = await request.json();
      setMessages(requestJson._embedded.messages);
    };
    fetchMessages().catch((e: any) => setMessageError(e.message));
  }, []);

  return (
    <>
      {messages.map((message: MessageModel, index: number) => (
        <div key={index} className="inbox-item">
          <Link to={`/messageadmin:${message.messageId}`}>
            <div className="inbox-item-img">
              <img
                src={require("../../../Assets/Images/user_icon.png")}
                className="rounded-circle"
                alt=""
              />
            </div>
            <h5 className="inbox-item-author mt-0 mb-1">{message.messageSenderName}</h5>
            <h6>{message.messageTitle}</h6>
            <p className="inbox-item-text">{message.messageBody.length > 50 ? `${message.messageBody.slice(0,50)}...` : message.messageBody}</p>
            <p className="inbox-item-date">{message.createdAt.slice(0,16)}</p>
          </Link>
        </div>
      ))}
    </>
  );
};

export default MessageList;
