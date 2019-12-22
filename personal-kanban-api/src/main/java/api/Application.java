package api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class Application implements CommandLineRunner {

  public static void main(String[] args) {
    SpringApplication.run(Application.class, args);
  }

  @Autowired
  JdbcTemplate jdbcTemplate;

  @Override
  public void run(String... strings) throws Exception {
    jdbcTemplate.execute("DROP TABLE TASKS IF EXISTS");
    jdbcTemplate.execute(
        "CREATE TABLE TASKS(ID INT PRIMARY KEY auto_increment, STATUS VARCHAR(10), TITLE VARCHAR(255), DESCRIPTION VARCHAR(255), DUEDATE DATE, COMPLETEDATE DATE NULL);");
    jdbcTemplate.execute(
        "INSERT INTO TASKS(STATUS, TITLE, DESCRIPTION, DUEDATE) VALUES ('TODO', 'Design Layout', 'Design layout of login page', '2019-11-15');");
    jdbcTemplate.execute(
        "INSERT INTO TASKS(STATUS, TITLE, DESCRIPTION, DUEDATE) VALUES ('ONGOING', 'Implement Delete Button', 'Implement delete button to the task page', '2019-11-30');");
    jdbcTemplate.execute(
        "INSERT INTO TASKS(STATUS, TITLE, DESCRIPTION, DUEDATE, COMPLETEDATE) VALUES ('DONE', 'Implement About Page', 'Mention abouts project and team members', '2019-9-28', '2019-9-26');");
    jdbcTemplate.execute(
        "INSERT INTO TASKS(STATUS, TITLE, DESCRIPTION, DUEDATE, COMPLETEDATE) VALUES ('DONE', 'Delete Button', 'Add the delete button of the bottom of cards', '2019-10-11', '2019-9-30');");
  }
}