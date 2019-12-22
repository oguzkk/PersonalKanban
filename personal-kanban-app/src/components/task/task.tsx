import React from "react";
import { Draggable, DraggableProvided } from "react-beautiful-dnd";
import moment from "moment";
import { ITaskItem } from "../../models/interface";
export interface ITaskProps extends ITaskItem {
  index: number;
}

const Task = (props: ITaskProps) => {
  return (
    <Draggable draggableId={props.stringId} index={props.index}>
      {(provided: DraggableProvided) => (
        <div
          className={"task-item"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={
              "task-complete-date" + (props.completeDate ? "" : " hidden")
            }
          >
            {props.completeDate
              ? "Completed on: " +
                moment(props.completeDate).format("DD/MM/YYYY")
              : ""}
          </div>
          <div className={"task-item-title"}>{props.title}</div>
          <div className={"task-item-description"}>{props.description}</div>
          <div className={"task-item-date"}>
            {props.dueDate
              ? "Due date: " + moment(props.dueDate).format("DD/MM/YYYY")
              : ""}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
