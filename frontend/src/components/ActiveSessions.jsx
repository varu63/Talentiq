import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  const safeSessions = Array.isArray(sessions) ? sessions : [];

  return (
    <div className="w-full card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-4 sm:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <ZapIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full" />
            <span className="text-sm font-medium text-success">
              {safeSessions.length} active
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <LoaderIcon className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : safeSessions.length > 0 ? (
            safeSessions.map((session) => {
              const isFull = session?.participant && !isUserInSession?.(session);

              return (
                <div
                  key={session?._id}
                  className="card bg-base-200 border border-base-300 hover:border-primary transition-all"
                >
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    
                    {/* LEFT SIDE */}
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <Code2Icon className="w-6 h-6 text-white" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-base-100" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-base sm:text-lg truncate">
                            {session?.problem || "Untitled"}
                          </h3>

                          {session?.difficulty && (
                            <span
                              className={`badge badge-sm ${getDifficultyBadgeClass(
                                session.difficulty
                              )}`}
                            >
                              {session.difficulty.charAt(0).toUpperCase() +
                                session.difficulty.slice(1)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm opacity-80">
                          <div className="flex items-center gap-1">
                            <CrownIcon className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">
                              {session?.host?.name || "Unknown"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <UsersIcon className="w-4 h-4" />
                            <span>
                              {session?.participant ? "2/2" : "1/2"}
                            </span>
                          </div>

                          {isFull ? (
                            <span className="badge badge-error badge-xs sm:badge-sm">
                              FULL
                            </span>
                          ) : (
                            <span className="badge badge-success badge-xs sm:badge-sm">
                              OPEN
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SIDE BUTTON */}
                    <div className="w-full sm:w-auto">
                      {isFull ? (
                        <button className="btn btn-disabled btn-sm w-full sm:w-auto">
                          Full
                        </button>
                      ) : (
                        <Link
                          to={`/session/${session?._id}`}
                          className="btn btn-primary btn-sm w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                          {isUserInSession?.(session) ? "Rejoin" : "Join"}
                          <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary/50" />
              </div>
              <p className="text-base sm:text-lg font-semibold opacity-70">
                No active sessions
              </p>
              <p className="text-sm opacity-50">
                Be the first to create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;