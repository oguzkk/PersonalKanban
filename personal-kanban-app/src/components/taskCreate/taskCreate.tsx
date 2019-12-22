import React, { useRef } from "react";
import { ITaskItem } from "../../models/interface";
import { Modal, Input, DatePicker, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

export interface ITaskCreateProps {
  modalClose(): void;
  createTask(task: ITaskItem): void;
  isModalVisible: boolean;
}

const TaskCreate = (props: ITaskCreateProps) => {
  const initTask: ITaskItem = {
    id: 0,
    stringId: "0",
    status: "TODO",
    description: "",
    dueDate: new Date(),
    title: ""
  };
  const task = useRef<ITaskItem>(initTask);
  const createTask = () => {
    props.createTask({ ...task.current });
    task.current = initTask;
  };

  const getFooter = () => {
    return (
      <React.Fragment>
        <Button
          type="primary"
          style={{
            backgroundColor: "#6c757d",
            borderColor: "#6c757d"
          }}
          onClick={props.modalClose}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor: "#007bff",
            borderColor: "#007bff"
          }}
          onClick={createTask}
        >
          OK
        </Button>
      </React.Fragment>
    );
  };

  const getCloseIcon = () => {
    return (
      <React.Fragment>
        <i className="close-icon fas fa-times" />
      </React.Fragment>
    );
  };

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    task.current.title = event.target.value;
  };

  const descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    task.current.description = event.target.value;
  };

  const dateChange = (date: moment.Moment | null, dateString: string) => {
    task.current.dueDate = date?.toDate() || moment().toDate();
  };

  return (
    <Modal
      title="Create A Task"
      style={{ top: 190 }}
      closeIcon={getCloseIcon()}
      visible={props.isModalVisible}
      destroyOnClose={true}
      onCancel={props.modalClose}
      footer={getFooter()}
      width={498}
      maskClosable={false}
    >
      <div className="form-row">
        TITLE:
        <Input placeholder="Task Title" onChange={titleChange}></Input>
      </div>
      <div className="form-row">
        DESCRIPTION:
        <TextArea
          autoSize={false}
          placeholder={"Describe the task"}
          onChange={descriptionChange}
        ></TextArea>
      </div>
      <div className="form-row">
        DUE DATE:
        <DatePicker
          placeholder="dd/mm/yyyy"
          format="DD/MM/YYYY"
          onChange={dateChange}
          suffixIcon={<React.Fragment></React.Fragment>}
        ></DatePicker>
      </div>
    </Modal>
  );
};

export default TaskCreate;
