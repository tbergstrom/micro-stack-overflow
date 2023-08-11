package learn.microstackoverflow.data;


import learn.microstackoverflow.models.Reply;
import org.springframework.dao.DataAccessException;

import java.util.List;

public interface ReplyRepository {
    List<Reply> findByPostId(int postId);

    Reply findById(int replyId);

    Reply create(Reply reply);


}
