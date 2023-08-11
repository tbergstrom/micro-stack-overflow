package learn.microstackoverflow.data.mappers;

import learn.microstackoverflow.models.AppUser;
import learn.microstackoverflow.models.Post;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PostMapper implements RowMapper<Post> {

    @Override
    public Post mapRow(ResultSet resultSet, int i) throws SQLException {
        Post post = new Post();
        AppUser appUser = new AppUser();
        appUser.setUsername(resultSet.getString("username"));

        post.setPostId(resultSet.getInt("post_id"));
        post.setPostTitle(resultSet.getString("title"));
        post.setPostBody(resultSet.getString("body"));
        post.setPostAppUserId(resultSet.getInt("author_id"));
        post.setAppUser(appUser);

        return post;
    }
}
