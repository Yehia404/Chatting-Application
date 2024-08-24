import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosSearch, IoMdSend } from "react-icons/io";
import UserDropdown from "../components/UserDropdown";

const users = [
  { id: 1, name: "Ahmed Amr" },
  { id: 2, name: "Yehia Sakr" },
  { id: 3, name: "Youssef Ahmed" },
];

const dummyMessages = {
  1: [
    { sender: "Ahmed", text: "Hi there!" },
    { sender: "Me", text: "Hello Ahmed!" },
  ],
  2: [
    { sender: "Yehia", text: "Hey, what's up?" },
    { sender: "Me", text: "Not much, you?" },
  ],
  3: [],
};

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setMessages(dummyMessages[userId] || []);
  };

  const handleSendMessage = () => {
    if (message.trim() === "" || selectedUserId === null) return;

    const newMessage = { sender: "Me", text: message.trim() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    dummyMessages[selectedUserId] = [
      ...(dummyMessages[selectedUserId] || []),
      newMessage,
    ];
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <div className="flex flex-col h-screen">
      {/* NavBar */}
      <div className="flex justify-end p-4 border-b border-gray-200">
        <UserDropdown />
      </div>

      <div className="flex flex-grow overflow-hidden">
        {/* User List */}
        <div className="w-full sm:w-1/4 border-r border-gray-200 p-4 overflow-y-auto">
          <div className="relative mb-4">
            <IoIosSearch className="absolute w-6 h-6 text-gray-500 left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-10 border rounded-md border-gray-300"
            />
          </div>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className={`flex items-center gap-x-2 ${
                  selectedUserId === user.id ? "bg-gray-300" : ""
                } cursor-pointer rounded-md p-2`}
                onClick={() => handleUserClick(user.id)}
              >
                <CgProfile className="w-7 h-7" />
                <span className="text-lg">{user.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col relative overflow-hidden">
          {selectedUser ? (
            <>
              <div className="flex items-center p-4 border-b border-gray-200 bg-gray-100">
                <CgProfile className="w-10 h-10 mr-2" />
                <span className="text-xl font-semibold">
                  {selectedUser.name}
                </span>
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message flex mb-2 items-center ${
                        msg.sender === "Me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender !== "Me" && (
                        <CgProfile className="w-10 h-10 mr-2 flex-shrink-0" />
                      )}
                      <div
                        className={`p-3 rounded-xl max-w-xs md:max-w-md lg:max-w-lg break-words ${
                          msg.sender === "Me"
                            ? "bg-cblue text-tcolor rounded-br-none"
                            : "bg-cgrey text-tcolor rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <IoChatboxEllipsesOutline className="w-40 h-40" />
                    <p className="text-2xl">You haven't started chatting yet</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-white flex items-center gap-x-3 border-t border-gray-200">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message"
                  className="w-full p-2 border rounded-full border-gray-300"
                />
                <div
                  className="flex items-center justify-center bg-cyan-500 rounded-full w-10 h-10 cursor-pointer"
                  onClick={handleSendMessage}
                >
                  <IoMdSend className="w-6 h-6 text-white" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center text-center text-gray-500">
              <IoChatboxEllipsesOutline className="w-40 h-40" />
              <p className="text-2xl">No Chats here yet...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
