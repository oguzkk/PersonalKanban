package api;

import org.springframework.web.bind.annotation.RestController;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ApiController {

   @Autowired
   JdbcTemplate jdbcTemplate;

   @CrossOrigin
   @PostMapping("/{id}")
   public void post(@Valid @RequestBody Task task) {
      this.jdbcTemplate.update(
            "UPDATE TASKS SET STATUS = ?, TITLE = ?, DESCRIPTION = ?, DUEDATE = ?, COMPLETEDATE = ? WHERE ID = ?",
            new Object[] { task.getStatus(), task.getTitle(), task.getDescription(), task.getDueDate(),
                  task.getCompleteDate(), task.getId() });
   }

   @CrossOrigin
   @PostMapping("/")
   public int create(@Valid @RequestBody Task task) {
      SimpleJdbcInsert jdbcInsert = new SimpleJdbcInsert(jdbcTemplate);
      jdbcInsert.withTableName("TASKS").usingGeneratedKeyColumns("ID");
      Map<String, Object> parameters = new HashMap<>();
      parameters.put("STATUS", task.getStatus());
      parameters.put("TITLE", task.getTitle());
      parameters.put("DESCRIPTON", task.getDescription());
      parameters.put("DUEDATE", task.getDueDate());
      Number key = jdbcInsert.executeAndReturnKey(new MapSqlParameterSource(parameters));
      return ((Number) key).intValue();
   }

   @CrossOrigin
   @RequestMapping("/")
   public List<Task> index() {
      List<Task> tasks = jdbcTemplate.query("SELECT * FROM TASKS", new RowMapper<Task>() {
         public Task mapRow(ResultSet rs, int rowNum) throws SQLException {
            Task t = new Task();
            t.setId(rs.getInt(1));
            t.setStatus(rs.getString(2));
            t.setTitle(rs.getString(3));
            t.setDescription(rs.getString(4));
            t.setDueDate(rs.getDate(5));
            t.setCompleteDate(rs.getDate(6));
            return t;
         }
      });
      return tasks;
   }
}
