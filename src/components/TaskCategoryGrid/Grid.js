import React from "react";
import TaskGrid from "./TaskGrid";
import CategoryGrid from "./CategoryGrid";
import "./taskGrid.css";
import DisplayGrid from "../DisplayGrid";

const styles = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

function Grid() {
  return (
    <>
      <div style={styles}>
        <TaskGrid />
        <CategoryGrid />
      </div>
      <div>
        <DisplayGrid />
      </div>
    </>
  );
}

export default Grid;
