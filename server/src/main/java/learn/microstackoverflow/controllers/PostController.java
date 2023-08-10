package learn.microstackoverflow.controllers;

import learn.microstackoverflow.domain.AppUserService;
import learn.microstackoverflow.domain.PostService;
import learn.microstackoverflow.domain.ReplyService;
import learn.microstackoverflow.domain.Result;
import learn.microstackoverflow.models.AppUser;
import learn.microstackoverflow.models.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/microstackoverflow/post")
public class PostController {
    private final PostService postService;
    private final ReplyService replyService;
    private final AppUserService appUserService;

    public PostController(PostService postService, ReplyService replyService, AppUserService appUserService) {
        this.postService = postService;
        this.replyService = replyService;
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<Post> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{postId}")
    public Post findById(@PathVariable int postId) {
        return postService.findById(postId);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Post post) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);
        post.setPostAppUserId(appUser.getAppUserId());

        Result<Post> result = postService.create(post);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
        }

        //from solar farm, agents handles this differently
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
    }



}
