package learn.microstackoverflow.data;

import learn.microstackoverflow.models.Post;

import java.util.List;

public interface PostRepository {

    List<Post> findAll();

    Post findById(int postId);

    Post create(Post post);
}
