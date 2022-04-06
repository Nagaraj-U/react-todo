import React from "react";
import { useEffect, useState } from "react";
import "./StyleTaskForms.css";
import { v4 as uuidv4 } from "uuid";
import { addtask, getTasks } from "../../LocalStorage/taskStorage";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTaskToStore } from "../../redux/taskSlice";

const AddTaskForm = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [data, setData] = useState({
    categoryID: "",
    newTask: "",
    newDescription: "",
    newDate: "",
  });
  let categories = useSelector((state) => state.categories);
  const { categoryID, newTask, newDescription, newDate } = data;

  const findCategoryName = () => {
    let obj = {};
    categories.map((c, i) => {
      if (c["id"].localeCompare(categoryID) === 0) {
        obj = {
          ...c,
        };
      }
    });
    return obj;
  };
  const formSubmit = (event) => {
    event.preventDefault();
    let _id = uuidv4();
    let finalTask = {
      id: _id,
      category: findCategoryName(),
      categoryID: categoryID,
      name: newTask,
      description: newDescription,
      date: newDate,
    };
    dispatch(addTaskToStore({ task: finalTask }));
    addtask(finalTask);
    setData({
      categoryID: "",
      newTask: "",
      newDescription: "",
      newDate: "",
    });

    return history.push("/");
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };

  return (
    <div className="form form-body">
      <div className="input-container ic1">
        <select className="input" onChange={handleChange("categoryID")}>
          <option value="all">Choose Task Category</option>
          {categories &&
            categories.map((c, index) => {
              return (
                <option key={index} value={c.id}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>

      <div className="input-container ic1">
        <input
          id="taskname"
          className="input"
          value={newTask}
          type="text"
          placeholder=" "
          onChange={handleChange("newTask")}
        />
        <div className="cut"></div>
        <label htmlFor="taskname" className="placeholder">
          Task name
        </label>
      </div>

      <div className="input-container ic2">
        <input
          id="description"
          className="input"
          value={newDescription}
          type="text"
          placeholder=" "
          onChange={handleChange("newDescription")}
        />
        <div className="cut"></div>
        <label htmlFor="description" className="placeholder">
          Task description
        </label>
      </div>

      <div className="input-container ic1">
        <input
          id="date"
          className="input"
          value={newDate}
          type="text"
          placeholder=" "
          onChange={handleChange("newDate")}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="date" className="placeholder">
          Date
        </label>
      </div>

      <button type="text" className="submit" onClick={formSubmit}>
        submit
      </button>
    </div>
  );
};

export default AddTaskForm;
