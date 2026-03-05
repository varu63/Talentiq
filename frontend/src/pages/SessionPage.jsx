import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";

import Navbar from "../components/Navbar";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import VideoCallUI from "../components/VideoCallUI";

import useStreamClient from "../hooks/useStreamClient";

import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";

import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
} from "lucide-react";

function SessionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [output, setOutput] = useState(null);
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);

  const [activeTab, setActiveTab] = useState("code");

  const { data: sessionData, isLoading: loadingSession, refetch } =
    useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;

  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  useEffect(() => {
    if (!session || !user || loadingSession) return;

    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession]);

  useEffect(() => {
    if (session?.status === "completed") {
      navigate("/dashboard");
    }
  }, [session]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleRunCode = async () => {
    setIsRunning(true);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("End this session?")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-base-100">

      <Navbar />

      {/* MOBILE TAB BAR */}
      <div className="md:hidden flex border-b bg-base-200">
        {["problem", "code", "output", "call"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 p-3 capitalize ${
              activeTab === tab ? "bg-primary text-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">

        {/* PROBLEM PANEL */}
        <div
          className={`
            bg-base-200 overflow-auto p-6
            ${activeTab !== "problem" ? "hidden md:block" : ""}
          `}
        >
          <h1 className="text-2xl font-bold mb-4">
            {session?.problem}
          </h1>

          {problemData?.description?.text && (
            <p className="mb-6 text-base-content/80">
              {problemData.description.text}
            </p>
          )}

          {problemData?.examples?.map((ex, i) => (
            <div key={i} className="mb-4 bg-base-100 p-4 rounded-lg">
              <p><b>Input:</b> {ex.input}</p>
              <p><b>Output:</b> {ex.output}</p>
            </div>
          ))}
        </div>

        {/* CODE + OUTPUT PANEL */}
        <div
          className={`
            flex flex-col
            ${activeTab !== "code" && activeTab !== "output" ? "hidden md:flex" : ""}
          `}
        >

          <div className="flex-1">
            <CodeEditorPanel
              selectedLanguage={selectedLanguage}
              code={code}
              isRunning={isRunning}
              onLanguageChange={(e) => setSelectedLanguage(e.target.value)}
              onCodeChange={(v) => setCode(v)}
              onRunCode={handleRunCode}
            />
          </div>

          <div className="h-40 border-t">
            <OutputPanel output={output} />
          </div>

        </div>

        {/* VIDEO PANEL */}
        <div
          className={`
            bg-base-200
            ${activeTab !== "call" ? "hidden lg:block" : ""}
          `}
        >

          {isInitializingCall ? (
            <div className="h-full flex items-center justify-center">
              <Loader2Icon className="animate-spin w-10 h-10" />
            </div>
          ) : !streamClient || !call ? (
            <div className="h-full flex items-center justify-center">
              <PhoneOffIcon className="w-10 h-10 text-error" />
            </div>
          ) : (
            <StreamVideo client={streamClient}>
              <StreamCall call={call}>
                <VideoCallUI
                  chatClient={chatClient}
                  channel={channel}
                />
              </StreamCall>
            </StreamVideo>
          )}

        </div>

      </div>

      {/* HOST CONTROLS */}
      {isHost && session?.status === "active" && (
        <div className="p-3 border-t flex justify-end">
          <button
            onClick={handleEndSession}
            className="btn btn-error btn-sm flex gap-2"
          >
            {endSessionMutation.isPending ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              <LogOutIcon className="w-4 h-4" />
            )}
            End Session
          </button>
        </div>
      )}
    </div>
  );
}

export default SessionPage;