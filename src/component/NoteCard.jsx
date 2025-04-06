import React, { useEffect, useRef, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset } from "../utils";
const NoteCard = ({ note }) => {
  const body = JSON.parse(note.body);
  const [position, setPosition] = useState(
    JSON.parse(note.position || '{"x":0,"y":0}')
  );
  const colors = JSON.parse(note.colors);
  const textAreaRef = useRef(null);
  const cardRef = useRef(null);

  let mouseStartPos = { x: 0, y: 0 };

  useEffect(() => {
    autoGrow(textAreaRef);
    return () => {
      // Cleanup event listeners
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  const autoGrow = (textAreaRef) => {
    const { current } = textAreaRef;
    if (current) {
      current.style.height = "auto";
      current.style.height = current.scrollHeight + "px";
    }
  };

  const mouseDown = (e) => {
    e.preventDefault();
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp, { once: true });
  };

  const mouseMove = (e) => {
    // Calculate movement direction
    let mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    // Update start position for next move
    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    // Use your utility function to calculate new position
    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };


  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: colors.colorBody,
        width: "370px",
        minHeight: "80px",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="card-header"
        onMouseDown={mouseDown}
        style={{
          padding: "8px 12px",
          background: colors.colorHeader,
          cursor: "grab",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Trash />
      </div>

      <div className="card-body" style={{ padding: "12px" }}>
        <textarea
          style={{
            color: colors.colorText,
            width: "100%",
            minHeight: "60px",
            border: "none",
            outline: "none",
            resize: "none",
            background: "transparent",
          }}
          defaultValue={body}
          ref={textAreaRef}
          onInput={() => autoGrow(textAreaRef)}
        />
      </div>
    </div>
  );
};

export default NoteCard;
