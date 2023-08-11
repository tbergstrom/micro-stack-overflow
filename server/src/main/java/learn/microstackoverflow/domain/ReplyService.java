package learn.microstackoverflow.domain;

import learn.microstackoverflow.data.ReplyRepository;
import learn.microstackoverflow.models.Reply;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {
    private final ReplyRepository repository;

    public ReplyService(ReplyRepository repository) {
        this.repository = repository;
    }

    public List<Reply> findByPostId(int postId) {
        return repository.findByPostId(postId);
    }

    public Reply findById(int replyId) {
        Reply reply = repository.findById(replyId);
        return reply;
    }

    public Result<Reply> create(Reply reply) {
        Result<Reply> result = validate(reply);

        if (!result.isSuccess()) {
            return result;
        }

        if (reply.getReplyId() != 0) {
            result.addErrorMessage("replyId cannot be set for 'create' operation in service", ResultType.INVALID);
            return result;
        }

        reply = repository.create(reply);
        result.setPayload(reply);
        return result;
    }

    private Result<Reply> validate(Reply reply) {
        Result<Reply> result = new Result<>();
        if (reply == null) {
            result.addErrorMessage("reply cannot be null in service", ResultType.INVALID);
            return result;
        }

        if (reply.getReplyBody() == null || reply.getReplyBody().isBlank()) {
            result.addErrorMessage("reply body is required in service", ResultType.INVALID);
            return result;
        }

        if (reply.getPostId() == 0) {
            result.addErrorMessage("reply's post id is required in service", ResultType.INVALID);

            return result;
        }

        if (reply.getPostAppUserId() == 0) {
            result.addErrorMessage("reply author id required in service", ResultType.INVALID);
            return result;
        }

        return result;

    }

}
