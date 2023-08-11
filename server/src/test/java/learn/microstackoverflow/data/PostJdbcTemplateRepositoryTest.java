package learn.microstackoverflow.data;

import learn.microstackoverflow.models.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PostJdbcTemplateRepositoryTest {

    @Autowired
    private PostJdbcTemplateRepository repository;

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
    void findAll() {
        List<Post> posts = repository.findAll();
        assertTrue(posts.size() >= 3);
    }

    @Test
    void findById() {
        Post post = new Post(1, "Test Title", "Test Body", 2);

        Post actual = repository.findById(1);
        assertEquals(post.getPostTitle(), actual.getPostTitle());

    }

    @Test
    void create() {
        Post post = new Post(0, "Test Create Title", "Test Create Body", 2);

        assertNotNull(repository.create(post));
        assertEquals(post, repository.findById(4));
    }
}