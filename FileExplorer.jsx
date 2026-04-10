import React, { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const Explorer = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ cursor: "pointer" }}>
      <p onClick={() => setExpanded((prev) => !prev)}>
        {data.isFolder ? expanded ? <FaCaretDown /> : <FaCaretRight /> : " "}
        {data.name}
      </p>
      <div style={expanded ? { display: "block" } : { display: "none" }}>
        {data.isFolder && (
          <div style={{ marginLeft: 15 }}>
            {data.items.map((item, id) => (
              <Explorer key={id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
