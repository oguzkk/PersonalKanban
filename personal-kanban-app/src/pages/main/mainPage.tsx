import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided
} from "react-beautiful-dnd";
import TaskContainer from "../../components/taskContainer/taskContainer";
import TaskCreate from "../../components/taskCreate/taskCreate";
import { ITaskContainerItem, ITaskItem } from "../../models/interface";
import TaskHelper from "../../helpers/taskHelper";

interface IMainPageState {
  isInitialized: boolean;
  todo: ITaskContainerItem;
  onGoing: ITaskContainerItem;
  done: ITaskContainerItem;
}

const MainPage: React.FC = () => {
  const initialState = (): IMainPageState => {
    return {
      isInitialized: false,
      todo: {
        tasks: []
      },
      onGoing: {
        tasks: []
      },
      done: {
        tasks: []
      }
    };
  };
  const [state, dispatch] = useState(initialState());
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getContainer = (
    containerId: string,
    state: IMainPageState
  ): ITaskContainerItem => {
    switch (containerId) {
      case "ONGOING":
        return state.onGoing;
      case "DONE":
        return state.done;
      default:
        return state.todo;
    }
  };

  useEffect(() => {
    if (state.isInitialized === false && getContainer) {
      TaskHelper.getTasks().then(tasks => {
        tasks.forEach((task: ITaskItem) => {
          const container = getContainer(task.status, state);
          container.tasks.push(task);
        });
        state.isInitialized = true;
        dispatch({ ...state });
      });
    }
  }, [state]);

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = getContainer(source.droppableId, state);
    const finish = getContainer(destination.droppableId, state);

    const startTasks = Array.from(start.tasks);

    if (start === finish) {
      startTasks.splice(source.index, 1);
      startTasks.splice(
        destination.index,
        0,
        start.tasks.find(task => {
          return task.stringId === draggableId;
        })!
      );

      start.tasks = startTasks;

      dispatch({ ...state });
      return;
    }

    // Moving from one list to another
    startTasks.splice(source.index, 1);

    const task = start.tasks.find(task => {
      return task.stringId === draggableId;
    })!;
    task.status = destination.droppableId;
    if (destination.droppableId === "DONE") {
      task.completeDate = moment().toDate();
    } else if (source.droppableId === "DONE") {
      task.completeDate = undefined;
    }
    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, task);

    start.tasks = startTasks;
    finish.tasks = finishTasks;

    dispatch({ ...state });
    TaskHelper.updateTask(task);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const createTask = async (task: ITaskItem) => {
    setIsModalVisible(false);
    const id = await TaskHelper.createTask(task);
    task.id = id;
    task.stringId = id.toString();
    state.todo.tasks.push(task);
    dispatch({ ...state });
  };

  return (
    <div className="main">
      <div className="wrapper">
        <DragDropContext onDragEnd={onDragEnd}>
          <TaskContainer
            tasks={state.todo.tasks}
            title="TODO"
            icon="fas fa-list-ul"
          />
          <TaskContainer
            tasks={state.onGoing.tasks}
            title="ONGOING"
            icon="fas fa-spinner"
          />
          <TaskContainer
            tasks={state.done.tasks}
            title="DONE"
            icon="fas fa-check-circle"
          />
        </DragDropContext>
        <i className="create-task fas fa-plus-circle" onClick={showModal} />
      </div>
      <TaskCreate
        isModalVisible={isModalVisible}
        modalClose={hideModal}
        createTask={createTask}
      ></TaskCreate>
    </div>
  );
};

export default MainPage;
