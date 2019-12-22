package api;

import java.sql.Date;

public class Task {

    private int id;
    private String status;
    private String title;
    private String description;
    private Date dueDate;
    private Date completeDate;

    public Task() {

    }

    public Task(int id, String status, String title, String description, Date dueDate, Date completeDate) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completeDate = completeDate;
    }

    public int getId() {
        return id;
    }

    public String getStringId() {
        return Integer.toString(this.id);
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCompleteDate() {
        return completeDate;
    }

    public void setCompleteDate(Date completeDate) {
        this.completeDate = completeDate;
    }
}