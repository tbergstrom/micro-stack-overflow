package learn.microstackoverflow.data;

import learn.microstackoverflow.models.Reply;
import org.springframework.stereotype.Repository;

import java.util.List;

//TODO implement Reply vertical slice

@Repository
public class ReplyJdbcTemplateRepository implements ReplyRepository{

    @Override
    public List<Reply> findByPostId() {
        return null;
    }

    @Override
    public Reply create(Reply reply) {
        return null;
    }
}
