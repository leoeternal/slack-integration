import React from "react";
import ReactHtmlParser from "react-html-parser";

function TemplateInfo({ text }) {
  return (
    <div>
      <h1>
        <u>Preview</u>
      </h1>
      <br />
      <br />
      <p>{ReactHtmlParser(text)}</p>
    </div>
  );
}

export default TemplateInfo;
