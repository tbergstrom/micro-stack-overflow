package learn.microstackoverflow.data;

import learn.microstackoverflow.models.AppUser;
import learn.microstackoverflow.models.Reply;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class ReplyJdbcTemplateRepositoryTest {

    @Autowired
    private ReplyJdbcTemplateRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    static boolean hasSetup = false;

    @BeforeEach
    void setup() {
        if (!hasSetup) {
            hasSetup = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }


    @Test
    void findByPostId() {
        List<Reply> replies = repository.findByPostId(1);

        assertTrue(replies.size() >= 1);
    }

    @Test
    void create() {
        List<String> roles = new ArrayList<>();
        AppUser appUser = new AppUser(1, "Johnnyboy", "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa", true, roles);
        Reply reply = new Reply(0, "Test Reply Body", 1, 2, appUser);

        assertNotNull(repository.create(reply));
        assertEquals(reply, repository.findById(4));
    }
}