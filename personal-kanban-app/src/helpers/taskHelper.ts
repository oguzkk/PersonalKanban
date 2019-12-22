import axios from "axios";
import { ITaskItem } from "../models/interface";

const API_URL = "http://localhost:8080/";

class TaskHelper {
  public static getTasks(): Promise<ITaskItem[]> {
    return axios.get(API_URL).then(response => {
      return response.data;
    });
  }

  public static updateTask(task: ITaskItem): Promise<void> {
    return axios.post(API_URL + task.stringId, task).then(response => {
      return response.data;
    });
  }

  public static createTask(task: ITaskItem): Promise<number> {
    return axios.post(API_URL, task).then(response => {
      return response.data;
    });
  }
}

export default TaskHelper;
