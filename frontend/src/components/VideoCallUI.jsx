import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  Loader2Icon,
  MessageSquareIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-lg">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col lg:flex-row gap-3 relative str-video">

      {/* VIDEO SECTION */}

      <div className="flex-1 flex flex-col gap-3">

        {/* HEADER */}
        <div className="flex items-center justify-between bg-base-100 p-3 rounded-lg shadow">

          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {participantCount}{" "}
              {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="btn btn-sm btn-ghost gap-2"
            >
              <MessageSquareIcon className="w-4 h-4" />
              Chat
            </button>
          )}
        </div>

        {/* VIDEO */}
        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden">
          <SpeakerLayout />
        </div>

        {/* CALL CONTROLS */}
        <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* DESKTOP CHAT SIDEBAR */}

      {chatClient && channel && (
        <div
          className={`hidden lg:flex flex-col w-80 bg-[#272a30] rounded-lg shadow overflow-hidden transition-transform duration-300 ${
            isChatOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ChatHeader close={() => setIsChatOpen(false)} />

          <ChatBody chatClient={chatClient} channel={channel} />
        </div>
      )}

      {/* MOBILE / TABLET CHAT DRAWER */}

      {chatClient && channel && isChatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 flex items-end">

          <div className="w-full h-[70%] bg-[#272a30] rounded-t-xl flex flex-col">

            <ChatHeader close={() => setIsChatOpen(false)} />

            <ChatBody chatClient={chatClient} channel={channel} />

          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Chat Header ---------- */

function ChatHeader({ close }) {
  return (
    <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
      <h3 className="font-semibold text-white">Session Chat</h3>

      <button
        onClick={close}
        className="text-gray-400 hover:text-white"
      >
        <XIcon className="size-5" />
      </button>
    </div>
  );
}

/* ---------- Chat Body ---------- */

function ChatBody({ chatClient, channel }) {
  return (
    <div className="flex-1 overflow-hidden stream-chat-dark">
      <Chat client={chatClient} theme="str-chat__theme-dark">
        <Channel channel={channel}>
          <Window>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}

export default VideoCallUI;