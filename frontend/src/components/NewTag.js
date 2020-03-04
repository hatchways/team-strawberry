import React, { useState, useContext } from "react";
import Context from "../Context";
import "./NewTag.css";

const NewTag = ({ id, addTags }) => {
  const [tag, setTag] = useState("");

  const { addTag } = useContext(Context);

  const submit = evt => {
    evt.preventDefault();
    addTag(id, tag);
    addTags(tag);
  };

  return (
    <form onSubmit={submit} className="tag-form">
      <input
        type="text"
        placeholder="Add a tag"
        onChange={evt => setTag(evt.target.value)}
        name="tag"
        value={tag}
      />
    </form>
  );
};

export default NewTag;
