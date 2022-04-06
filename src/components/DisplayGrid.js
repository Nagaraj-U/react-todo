import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteTaskByIdStore } from "../redux/taskSlice";

function DisplayGrid(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  const tasks_ = useSelector((state) => state.tasks);
  const categories_ = useSelector((state) => state.categories);

  const updateLocalstorage = (_tasks) => {
    let newArray = [].concat([..._tasks]);
    localStorage.setItem("task", JSON.stringify(newArray));
  };
  const getTasksByCategoryId = (id) => {
    let _tasks = [];
    _tasks = tasks_.filter((t, i) => {
      return t.categoryID === id;
    });
    return _tasks;
  };

  const deleteTaskByID = (id) => {
    let _tasks = tasks_.filter((t) => {
      return t.id !== id;
    });
    dispatch(deleteTaskByIdStore({ id }));
    updateLocalstorage(_tasks);
  };

  const tableStyle = {
    width: "1200px",
    borderRadius: "3px",
  };
  return (
    categories_.length > 0 && (
      <div>
        <Table style={tableStyle} variant="dark" striped>
          <thead>
            <tr>
              <td>Id</td>
              <td>Category</td>
              <tr>
                <td style={{ width: "120px" }}>S.No</td>
                <td style={{ width: "200px" }}>Name</td>
                <td style={{ width: "200px" }}>Date</td>
              </tr>
            </tr>
          </thead>
          <tbody>
            {categories_.map((c, index) => {
              return (
                <tr>
                  <td style={{ width: "100px" }}>{index + 1}</td>
                  <td style={{ width: "200px" }}>{c.name}</td>
                  <td>
                    <Table variant="dark" striped>
                      <tbody>
                        {getTasksByCategoryId(c.id).map((task, idx) => {
                          return (
                            <tr>
                              <td style={{ width: "100px" }}>{idx + 1}</td>
                              <td style={{ width: "200px" }}>{task.name}</td>
                              <td style={{ width: "200px" }}>{task.date}</td>
                              <td>
                                <button
                                  style={{ marginLeft: "20px" }}
                                  className="btn btn-primary btn-sm"
                                  onClick={() => {
                                    history.push({
                                      pathname: "/viewtask",
                                      state: {
                                        id: task.id,
                                        name: task.name,
                                        description: task.description,
                                        date: task.date,
                                        category: task.category.name,
                                      },
                                    });
                                  }}
                                >
                                  Detailed View
                                </button>

                                <button
                                  style={{ marginLeft: "20px" }}
                                  className="btn btn-warning btn-sm"
                                  onClick={() => {
                                    history.push({
                                      pathname: "/updatetask",
                                      state: {
                                        id: task.id,
                                        name: task.name,
                                        date: task.date,
                                        categoryID: task.categoryID,
                                        description: task.description,
                                        categoryName: task.category.name,
                                      },
                                    });
                                  }}
                                >
                                  Update Task
                                </button>

                                <button
                                  style={{ marginLeft: "20px" }}
                                  className="btn btn-danger btn-sm"
                                  onClick={() => {
                                    deleteTaskByID(task.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )
  );
}

export default DisplayGrid;
