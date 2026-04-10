// App.jsx

import React, { useState } from "react";
import Explorer from "./Explorer";
import { data } from "./data";

export default function App() {
  const [tree, setTree] = useState(data);

  const insertNode = (tree, folderName, itemName, isFolder) => {
    if (tree.name === folderName && tree.isFolder) {
      return {
        ...tree,
        children: [
          ...tree.children,
          {
            name: itemName,
            isFolder,
            children: isFolder ? [] : undefined,
          },
        ],
      };
    }

    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map((child) =>
          insertNode(child, folderName, itemName, isFolder)
        ),
      };
    }

    return tree;
  };

  const handleInsert = (folderName, itemName, isFolder) => {
    const newTree = insertNode(tree, folderName, itemName, isFolder);
    setTree(newTree);
  };

  return <Explorer data={tree} handleInsert={handleInsert} />;
}


// Explorer .jsx 

import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

const Explorer = ({ data, handleInsert }) => {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <p onClick={() => setExpanded((prev) => !prev)}>
          {data.isFolder &&
            (expanded ? <AiFillCaretDown /> : <AiFillCaretRight />)}
          {data.name}
        </p>

        {data.isFolder && (
          <button onClick={() => setShowInput(true)}>+ Folder</button>
        )}
      </div>

      {showInput && (
        <input
          type="text"
          autoFocus
          onBlur={(e) => {
            handleInsert(data.name, e.target.value, true);
            setShowInput(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInsert(data.name, e.target.value, true);
              setShowInput(false);
            }
          }}
        />
      )}

      <div style={{ display: expanded ? "block" : "none", marginLeft: "15px" }}>
        {data.children?.map((child, idx) => (
          <Explorer
            key={idx}
            data={child}
            handleInsert={handleInsert}
          />
        ))}
      </div>
    </div>
  );
};

export default Explorer;

