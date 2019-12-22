import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ITaskItem } from "../../models/interface";
import Task from "../task/task";

export interface ITaskContainerProps {
  tasks: ITaskItem[];
  title: string;
  icon: string;
}

const TaskContainer = (props: ITaskContainerProps) => {
  return (
    <div className={"container noselect"}>
      <div className={"title-container"}>
        <i className={"icon " + props.icon} />
        <div className={"title"}>{props.title}</div>
      </div>
      <Droppable droppableId={props.title}>
        {(provided, snapshot) => (
          <div
            className={"task-list"}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task: ITaskItem, index: number) => {
              return (
                <Task
                  key={task.stringId}
                  status={task.status}
                  index={index}
                  id={task.id}
                  stringId={task.stringId}
                  title={task.title}
                  description={task.description}
                  dueDate={task.dueDate}
                  completeDate={task.completeDate}
                ></Task>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskContainer;
