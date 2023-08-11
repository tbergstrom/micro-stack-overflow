package learn.microstackoverflow.data;

import learn.microstackoverflow.data.mappers.PostMapper;
import learn.microstackoverflow.models.Post;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;


@Repository
public class PostJdbcTemplateRepository implements PostRepository{

    private final JdbcTemplate jdbcTemplate;

    public PostJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this. jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Post> findAll() {
        final String sql = "select post_id, title, body, author_id, username "
                + "from post "
                + "join app_user on author_id = app_user_id; ";
        return jdbcTemplate.query(sql, new PostMapper());
    }

    @Override
    public Post findById(int postId) {
        final String sql = "select post_id, title, body, author_id, username "
                + "from post "
                + "join app_user on author_id = app_user_id "
                + "where post_id = ?";

        Post post = jdbcTemplate.query(sql, new PostMapper(), postId).stream()
                .findFirst().orElse(null);

        return post;
    }

    @Override
    public Post create(Post post) {
        final String sql = "insert into post (title, body, author_id) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, post.getPostTitle());
            ps.setString(2, post.getPostBody());
            ps.setInt(3, post.getPostAppUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        post.setPostId(keyHolder.getKey().intValue());
        return post;
    }
}
