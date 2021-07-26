import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const Loader = styled(Backdrop)`
  color: #fe5200;
`;

export default function Loading() {
  return (
      <Loader invisible={true} open={true}>
        <CircularProgress color="inherit" />
      </Loader>
  );
}
