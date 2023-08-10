package learn.microstackoverflow.domain;


import learn.microstackoverflow.data.PostRepository;
import learn.microstackoverflow.data.ReplyRepository;
import learn.microstackoverflow.models.Post;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository repository;
    private final ReplyRepository replyRepository;

    public PostService(PostRepository repository, ReplyRepository replyRepository) {
        this.repository = repository;
        this.replyRepository = replyRepository;
    }

    public List<Post> findAll() { return repository.findAll(); }

    public Post findById(int postId) {
        Post post = repository.findById(postId);
        //List<Reply> replies = replyRepository.findByPostId(postId);
        //post.setReplies(replies)
        return post;
    }

    public Result<Post> create(Post post) {
        Result<Post> result = validate(post);
        if (!result.isSuccess()) {
            return result;
        }

        if (post.getPostId() != 0) {
            result.addErrorMessage("postId cannet be set for 'create' operation in service", ResultType.INVALID);
            return result;
        }

        post = repository.create(post);
        result.setPayload(post);
        return result;
    }

    private Result<Post> validate(Post post) {
        Result<Post> result = new Result<>();
        if (post == null) {
            result.addErrorMessage("post cannot be null in service", ResultType.INVALID);
            return result;
        }

        if (post.getPostTitle() == null || post.getPostTitle().isBlank()) {
            result.addErrorMessage("post title is required in service", ResultType.INVALID);
            System.out.println(post.getPostTitle());
            System.out.println(post.getPostBody());
            System.out.println(post.getPostAppUserId());


            return result;
        }

        if (post.getPostBody() == null || post.getPostBody().isBlank()) {
            result.addErrorMessage("post body is required in service", ResultType.INVALID);

            return result;
        }

        if (post.getPostAppUserId() == 0) {
            result.addErrorMessage("post author id required in service", ResultType.INVALID);
            return result;
        }

        return result;

    }

}
