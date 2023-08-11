package learn.microstackoverflow.data;

import learn.microstackoverflow.data.mappers.ReplyMapper;
import learn.microstackoverflow.models.Reply;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

//TODO implement Reply vertical slice

@Repository
public class ReplyJdbcTemplateRepository implements ReplyRepository{

    private final JdbcTemplate jdbcTemplate;

    public ReplyJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

//    TODO think about this findbypostid .query
    @Override
    public List<Reply> findByPostId(int postId) {
        final String sql = "select reply_id, body, post_id, author_id "
                + "from reply "
                + "where post_id = ?";

        return jdbcTemplate.query(sql, new ReplyMapper(), postId);
    }

    @Override
    public Reply findById(int replyId) {
        final String sql = "select reply_id, body, post_id, author_id "
                + "from reply "
                + "where reply_id = ?";

        Reply reply = jdbcTemplate.query(sql, new ReplyMapper(), replyId).stream()
                .findFirst().orElse(null);

        return reply;
    }

    @Override
    public Reply create(Reply reply) {
        final String sql ="insert into reply (body, post_id, author_id) "
                + " values (?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, reply.getReplyBody());
            ps.setInt(2, reply.getPostId());
            ps.setInt(3, reply.getPostAppUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        reply.setReplyId(keyHolder.getKey().intValue());
        return reply;
    }
}
