import React, { useEffect, useState } from "react";
import MessageModel from "../../../Models/MessageModel";

const MessagePage = () => {
  const [message, setMessage] = useState<MessageModel>();
  const [messageError, setMessageError] = useState("");
  const messageId = window.location.pathname.split(":")[1];

  useEffect(() => {
    const fetchSingleMessage = async () => {
      const url = `http://localhost:8080/api/messages/${messageId}`;
      const request = await fetch(url);
      if (!request.ok) {
        throw new Error("Something went wrong!");
      }
      const responseJson = await request.json();
      setMessage(responseJson);
    };
    fetchSingleMessage().catch((e: any) => setMessageError(e.message));
  },[]);
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container">
            <div className="single-message mt-3">
              <h1 className="text-center message-admin-head">Message from User</h1>
              <div className="message-admin-info d-flex justify-content-around mt-4">
                <div className="message-label">
                  <label className="mx-1">Message Sender Email:</label>
                  <span>{message?.messageEmail}</span>
                </div>
                <div  className="message-label">
                  <label className="mx-1">Message Sender Phone:</label>
                  <span>{message?.messagePhone}</span>
                </div>
                <div className="message-label">
                  <label className="mx-1">Message Sender Name: </label>
                  <span>{message?.messageSenderName}</span>
                </div>
              </div>
              <div className="message-admin mt-3">
                <h3 className="mr-1">Message Title:</h3>
                <p>{message?.messageTitle}</p>
                <h3>Message Body: </h3>
                <p>{message?.messageBody}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagePage;
