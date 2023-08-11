package learn.microstackoverflow.controllers;

import learn.microstackoverflow.domain.AppUserService;
import learn.microstackoverflow.domain.ReplyService;
import learn.microstackoverflow.domain.Result;
import learn.microstackoverflow.models.AppUser;
import learn.microstackoverflow.models.Reply;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/microstackoverflow/reply")
public class ReplyController {
    private final ReplyService service;
    private final AppUserService appUserService;

    public ReplyController(ReplyService service, AppUserService appUserService) {
        this.service = service;
        this.appUserService = appUserService;
    }

    @GetMapping("/{postId}")
    public List<Reply> findByPostId(@PathVariable int postId) {
        return service.findByPostId(postId);
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Reply reply) {
        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        AppUser appUser = (AppUser) appUserService.loadUserByUsername(username);
        reply.setPostAppUserId(appUser.getAppUserId());

        Result<Reply> result = service.create(reply);
        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getErrorMessages(), HttpStatus.BAD_REQUEST);
        }

        //from solar farm, agents handles this differently
        return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);

    }

}
