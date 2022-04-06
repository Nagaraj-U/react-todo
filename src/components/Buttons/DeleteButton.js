import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCategories } from "../../LocalStorage/categoryStorage";
import { deleteTasks } from "../../LocalStorage/taskStorage";
import { useSelector, useDispatch } from "react-redux";
import { deleteAllTasksStore } from "../../redux/taskSlice";
import { deleteAllCategoriesStore } from "../../redux/categorySlice";

const DeleteButton = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (props.taskFlag) {
      dispatch(deleteAllTasksStore());
      deleteTasks();
      history.push({
        pathname: "/deletestatus",
        state: {
          type: "tasks",
        },
      });
    } else {
      dispatch(deleteAllCategoriesStore());
      deleteCategories();
      history.push({
        pathname: "/deletestatus",
        state: {
          type: "categories",
        },
      });
    }
  };
  return (
    <div className="button">
      <button className="btn btn-info btn-block" onClick={handleSubmit}>
        <i className="fa fa-minus"></i> {props.description}
      </button>
    </div>
  );
};

export default DeleteButton;
