package learn.microstackoverflow.data.mappers;

import learn.microstackoverflow.models.Reply;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReplyMapper implements RowMapper<Reply> {

    @Override
    public Reply mapRow(ResultSet resultset, int i) throws SQLException {
        Reply reply = new Reply();
        reply.setReplyId(resultset.getInt("reply_id"));
        reply.setReplyBody(resultset.getString("body"));
        reply.setPostId(resultset.getInt("post_id"));
        reply.setPostId(resultset.getInt("author_id"));

        return reply;
    }
}
