import { useEffect, useRef, useState } from "react";

const IDLE_MS = 5 * 60 * 5000;
const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "wheel"];

function IdleVideoOverlay() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const videoRef = useRef(null);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;

    const clearTimer = () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const scheduleIdle = () => {
      clearTimer();
      timeoutRef.current = window.setTimeout(() => setVisible(true), IDLE_MS);
    };

    const handleActivity = () => {
      if (visibleRef.current) setVisible(false);
      scheduleIdle();
    };

    ACTIVITY_EVENTS.forEach((evt) => {
      window.addEventListener(evt, handleActivity, { passive: true, capture: true });
    });

    scheduleIdle();

    return () => {
      clearTimer();
      ACTIVITY_EVENTS.forEach((evt) => {
        window.removeEventListener(evt, handleActivity, { capture: true });
      });
    };
  }, []);

  useEffect(() => {
    if (visible) {
      videoRef.current?.play().catch(() => {});
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#000",
      }}
    >
      <video
        ref={videoRef}
        src="/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          pointerEvents: "none",
          height: "100%",
          width: "100%",
          userSelect: "none",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default IdleVideoOverlay;
