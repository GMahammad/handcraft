import React, { useState } from "react";

const ContactMessage = () => {
  const [messageEmail, setMessageSenderEmail] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageName, setMessageSenderName] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [messagePhone, setMessageSenderPhone] = useState("");

  const [fetchError, setFetchError] = useState(false);
  const [messageSuccess,setMessageSuccess] = useState(false)
  const [messageError,setMessageError] = useState(false)

  const sendMessageToAdmin = async (event:any) => {
    event.preventDefault();
  
    try {
        if(messageBody || messageEmail || messageName || messagePhone || messageTitle){
      const response = await fetch("http://localhost:8080/api/v1/messages/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageEmail: messageEmail,
          messageTitle: messageTitle,
          messageName: messageName,
          messageBody: messageBody,
          messagePhone: messagePhone,
        }),
      });
  
      if (response.ok) {
        setMessageSuccess(true);
        setMessageError(false)
      } else {
        setFetchError(true);
        throw new Error("Failed to send message");
      }
    }else{setMessageError(true)}
    } catch (error) {
      setFetchError(true);
    }
  };
  

  return (
    <div className="contact-message mt-5">
      <div className="contact-title">
        <h4>Contact Information</h4>
      </div>
      <form
        className="contact-form"
        onSubmit={sendMessageToAdmin}
      >
        <div className="row">
            {messageSuccess ? 
            <p className="success-message">Message sent successfully. Thanks for your message.</p> : <></>}
            {messageError ? <p className="error-message text-center">Please fill the all fields and send your message !</p> : <></>}
          <div className="col-md-6">
            <div className="contact-input-style mb-30">
              <label>Name*</label>
              <input
                name="name"
                type="text"
                onChange={(e) => {
                  setMessageSenderName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-input-style mb-30">
              <label>Email*</label>
              <input
                name="email"
                type="email"
                onChange={(e) => {
                  setMessageSenderEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-input-style mb-30">
              <label>Telephone</label>
              <input
                name="telephone"
                type="text"
                onChange={(e) => {
                  setMessageSenderPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact-input-style mb-30">
              <label>subject</label>
              <input
                name="subject"
                type="text"
                onChange={(e) => {
                  setMessageTitle(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="contact-textarea-style mb-30">
              <label>Comment*</label>
              <textarea
                className="form-control2"
                name="message"
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="add-to-card-list">

            <button className="submit px-3 py-2 " type="submit">
              Send Message
            </button>
            </div>
          </div>
        </div>
      </form>
      <p className="form-messege"></p>
    </div>
  );
};

export default ContactMessage;
