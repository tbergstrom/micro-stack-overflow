package learn.microstackoverflow.domain;

import learn.microstackoverflow.data.PostRepository;
import learn.microstackoverflow.models.AppUser;
import learn.microstackoverflow.models.Post;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest()
class PostServiceTest {

    @Autowired
    PostService service;

    @MockBean
    PostRepository repository;

    @Test
    void findAll() {
        AppUser appUser = new AppUser();
        appUser.setUsername("SallyJo");
        when(repository.findAll()).thenReturn(List.of(
                new Post(1, "Test Title", "Test Body", 2, appUser)
        ));

        List<Post> posts = service.findAll();

        assertEquals(1, posts.size());
    }

    @Test
    void findById() {
    }

    @Test
    void create() {
    }
}