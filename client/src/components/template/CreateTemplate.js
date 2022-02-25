import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useDispatch, useSelector } from "react-redux";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ReactHtmlParser from "react-html-parser";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./template.css";
import { addTemplate } from "../../store/TemplateAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTemplate() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { templateAdded } = useSelector((state) => state.template);
  const [text, setText] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [triggerType, setTriggerType] = useState("");

  const templateNameHandler = (e) => {
    setTemplateName(e.target.value);
  };

  const handleChange = (event) => {
    // console.log(event.target.value);
    setTriggerType(event.target.value);
    // console.log(triggerType);
  };

  const createButtonHandler = () => {
    const templateData = {
      templateName,
      triggerType,
      text,
    };
    if (templateName === "" || text === "" || triggerType === "") {
      toast.warning("Fill every field");
    } else {
      setTemplateName("");
      setText("");
      setTriggerType("");
      dispatch(addTemplate(templateData));
    }
  };

  useEffect(() => {
    if (templateAdded) {
      navigate("/template");
    }
  }, [templateAdded]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="createtemplate">
        {/* {ReactHtmlParser(text)} */}
        <h1>Create Template</h1>

        <div>
          <TextField
            fullWidth
            style={{ margin: "20px 0px 0px 0px" }}
            id="outlined-basic"
            label="Template Name"
            variant="outlined"
            value={templateName}
            onChange={templateNameHandler}
          />
        </div>

        <div style={{ margin: "20px 0px 0px 0px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Trigger Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={triggerType}
              label="Trigger Type"
              onChange={handleChange}
            >
              <MenuItem value="slack">Slack</MenuItem>
              <MenuItem value="greythr">GreytHR</MenuItem>
              <MenuItem value="gitlab">Gitlab</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div style={{ margin: "20px 0px 0px 0px" }}>
          {triggerType === "slack" ? (
            <>
              <p style={{ color: "grey" }}>
                Available Tokens for Slack - firstname, lastname, slack
              </p>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(editor.getData());

                  // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </>
          ) : null}
        </div>

        <div style={{ margin: "20px 0px 0px 0px" }}>
          {triggerType === "greythr" ? (
            <>
              <p style={{ color: "grey" }}>
                Available Tokens for GreytHR- firstname, lastname, mobilenumber,
                designation, email, greythr
              </p>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(editor.getData());

                  console.log(data);
                  // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </>
          ) : null}
        </div>

        <div style={{ margin: "20px 0px 0px 0px" }}>
          {triggerType === "gitlab" ? (
            <>
              <p style={{ color: "grey" }}>
                Available Tokens for Gitlab- firstname, lastname, email, gitlab
              </p>
              <CKEditor
                editor={ClassicEditor}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(editor.getData());
                  // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  // console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  // console.log("Focus.", editor);
                }}
              />
            </>
          ) : null}
        </div>
        <div>
          <Button
            onClick={createButtonHandler}
            color="error"
            size="small"
            variant="contained"
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateTemplate;
