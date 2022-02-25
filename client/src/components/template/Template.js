import React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import TemplateInfo from "./TemplateInfo";
import { deleteTemplate } from "../../store/TemplateAction";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

function Template({ template, sendEmailHandler }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ display: "flex", margin: "20px 0px 0px 0px" }}>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <p>{template.templateName}</p>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 10 }}>
          <TemplateInfo text={template.text} />{" "}
        </Typography>
      </Popover>
      <p style={{ margin: "0px 0px 0px 10px", color: "grey" }}>
        {template.triggerType}
      </p>
      <Button
        style={{ margin: "0px 0px 0px 10px", fontSize: "10px" }}
        size="small"
        variant="outlined"
        onClick={() => dispatch(deleteTemplate(template._id))}
      >
        Delete
      </Button>
      <Button
        style={{ margin: "0px 0px 0px 10px", fontSize: "10px" }}
        size="small"
        variant="outlined"
        onClick={() => sendEmailHandler(template._id)}
      >
        Send Email
      </Button>
    </div>
  );
}

export default Template;
