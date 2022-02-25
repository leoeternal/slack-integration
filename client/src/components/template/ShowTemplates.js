import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import "./showTemplates.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { templateAction } from "../../store/TemplateSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteTemplate, getTemplates } from "../../store/TemplateAction";
import { getUserDetails, sendMail } from "../../store/UserAction";
import { userAction } from "../../store/UserSlice";
import Template from "./Template";

function ShowTemplates() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { templateAdded, templates, templateDeleted } = useSelector(
    (state) => state.template
  );

  const { userId, userDetails, userAdded } = useSelector((state) => state.user);

  useEffect(() => {
    if (templateAdded) {
      toast.success("Template Added");
      dispatch(templateAction.updateTemplateAddedValue());
    }
  }, [templateAdded]);

  useEffect(() => {
    dispatch(getTemplates());
  }, []);

  useEffect(() => {
    if (templateDeleted) {
      toast.success("Template Deleted");
    }
    dispatch(getTemplates());
    dispatch(templateAction.updateTemplateDeletedValue());
  }, [templateDeleted]);

  useEffect(() => {
    if (userId !== false) {
      dispatch(getUserDetails(userId));
    }
  }, []);

  useEffect(() => {
    if (userAdded) {
      toast.success("Choose Template");
    }
    dispatch(userAction.updateUserAddedValue());
  }, [userAdded]);

  const sendEmailHandler = (templateId) => {
    if (userId === false) {
      toast.error("Select a user");
    } else {
      dispatch(
        sendMail({
          userDetails,
          templateId,
        })
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      <div className="showtemplate">
        <div style={{ display: "flex" }}>
          {userId !== false ? (
            <h1>
              Templates for {userDetails.firstname} {userDetails.lastname}
            </h1>
          ) : (
            <h1>Choose Template</h1>
          )}
          <Button
            style={{ margin: "0px 0px 0px 20px" }}
            size="small"
            onClick={() => navigate("/create/template")}
            color="error"
            variant="contained"
          >
            Create Template
          </Button>
        </div>
        <div style={{ margin: "30px 0px 0px 0px" }}>
          {templates.map((template) => (
            <Template sendEmailHandler={sendEmailHandler} template={template} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowTemplates;
