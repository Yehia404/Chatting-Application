import React, { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosSearch, IoMdSend, IoIosArrowDown } from "react-icons/io";
import UserDropdown from "../components/UserDropdown";
import delivered from "../assets/delivered.png";
import seen from "../assets/seen.png";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null); // For Messaging
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { loggedInUser, authToken } = useUserContext();

  const handleUserClick = (userId) => {
    setMessages([]);
    setSelectedUserId(userId);
    handleGetMessages(userId);
    setShowScrollButton(false);
  };

  // Socket.IO Event Handlers
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // Joining Chat Room
  useEffect(() => {
    if (selectedUserId && chatId) {
      socket.emit("joinChat", chatId);
    }
  }, [selectedUserId, chatId]);

  // Messages Logic
  const handleGetMessages = async (userId) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/chats/getmsgs",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          params: {
            userId,
          },
        }
      );
      setChatId(response.data.chatId);
      const messages = response.data.messages;
      setMessages(messages || []);
    } catch (error) {
      console.error("Failed to get messages", error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" || selectedUserId === null) return;

    try {
      let currentChatId = chatId;
      let newChat = null;

      if (!currentChatId) {
        const response = await axios.post(
          "http://localhost:5000/api/chats/create",
          {
            participants: [loggedInUser._id, selectedUserId],
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        newChat = response.data.chat;
        currentChatId = newChat._id;
        setChatId(currentChatId);
      }

      const newMessage = {
        chatId: currentChatId,
        sender: loggedInUser._id,
        content: message.trim(),
        timestamp: new Date(),
      };

      socket.emit("sendMessage", newMessage);

      if (newChat) {
        if (selectedUser) {
          newChat.participants = [loggedInUser, selectedUser];
        }
        setChats((prevChats) => [...prevChats, newChat]);
      }
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  // Scrolling Logic
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      messagesContainerRef.current;

    if (scrollHeight - scrollTop > clientHeight + 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Search Users and Get Chats
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchUsers(searchQuery);
    } else {
      if (chats.length > 0) {
        const chatUsers = chats.map((chat) => {
          return chat.participants.find(
            (user) => user._id !== loggedInUser._id
          );
        });
        console.log(chatUsers);
        setUsers(chatUsers);
      } else {
        setUsers([]);
      }
    }
  }, [searchQuery, chats]);

  const searchUsers = async (query) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/search",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },

          params: {
            query,
          },
        }
      );
      const users = response.data.users;
      console.log(users);
      setUsers(users);
    } catch (error) {
      console.error("Failed to search users", error);
    }
  };

  const selectedUser = users.find((user) => user._id === selectedUserId);

  const getChats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/chats/getchats",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const chats = response.data.chats;
      setChats(chats);
    } catch (error) {
      console.error("Failed to get chats", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* NavBar */}
      <div className="flex justify-end p-4 border-b border-gray-200">
        <UserDropdown username={loggedInUser.username} />
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user._id}
                className={`flex items-center gap-x-2 ${
                  selectedUserId === user._id ? "bg-gray-300" : ""
                } cursor-pointer rounded-md p-2`}
                onClick={() => handleUserClick(user._id)}
              >
                <div className="relative inline-block">
                  <CgProfile className="w-7 h-7" />
                  {user.online && (
                    <span className="absolute -top-1 right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <span className="text-lg">{user.username}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-grow flex flex-col relative overflow-hidden">
          {selectedUser ? (
            <>
              <div className="flex flex-row items-center p-4 gap-x-2 border-b border-gray-200 bg-gray-100">
                <div className="relative inline-block">
                  <CgProfile className="w-10 h-10" />
                  {selectedUser.online && (
                    <span className="absolute -top-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold">
                    {selectedUser.username}
                  </span>
                  <p className="text-sm text-gray-500">
                    {selectedUser.connectivity}
                  </p>
                </div>
              </div>
              <div
                className="flex-grow p-4 overflow-y-auto pb-20"
                ref={messagesContainerRef}
                onScroll={handleScroll}
              >
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`message flex mb-2 items-center ${
                        msg.sender === loggedInUser._id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {msg.sender !== loggedInUser._id && (
                        <CgProfile className="w-10 h-10 mr-2 flex-shrink-0" />
                      )}
                      <div className="flex flex-col">
                        <div
                          className={`p-3 rounded-xl max-w-xs md:max-w-md lg:max-w-lg break-words ${
                            msg.sender === loggedInUser._id
                              ? "bg-cblue text-tcolor rounded-br-none"
                              : "bg-cgrey text-tcolor rounded-bl-none"
                          }`}
                        >
                          {msg.content}
                        </div>
                        <div
                          className={`text-sm text-gray-500 mt-1 flex items-center ${
                            msg.sender === loggedInUser._id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {msg.sender === loggedInUser._id && (
                            <img
                              src={msg.seen ? seen : delivered}
                              alt={msg.seen ? "seen" : "delivered"}
                              className="w-4 h-4"
                            />
                          )}

                          <span className="text-sm ml-2">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <IoChatboxEllipsesOutline className="w-40 h-40" />
                    <p className="text-2xl">You haven't started chatting yet</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {showScrollButton && (
                <button
                  className="fixed bottom-20 right-3 bg-white bg-opacity-70 text-cyan-500 rounded-full p-2 shadow-lg"
                  onClick={scrollToBottom}
                >
                  <IoIosArrowDown className="w-6 h-6" />
                </button>
              )}

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
