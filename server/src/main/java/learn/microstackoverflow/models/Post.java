package learn.microstackoverflow.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Post {
    private int postId;
    private String postTitle;
    private String postBody;
    private int postAppUserId;
    private AppUser appUser;
    private List<Reply> replies = new ArrayList<>();

    public Post() {}

    public Post(int postId, String postTitle, String postBody, int postAppUserId, AppUser appUser) {
        this.postId = postId;
        this.postTitle = postTitle;
        this.postBody = postBody;
        this.postAppUserId = postAppUserId;
        this.appUser = appUser;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostBody() {
        return postBody;
    }

    public void setPostBody(String postBody) {
        this.postBody = postBody;
    }

    public int getPostAppUserId() {
        return postAppUserId;
    }

    public void setPostAppUserId(int postAppUserId) {
        this.postAppUserId = postAppUserId;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post that = (Post) o;
        return postId == that.postId && Objects.equals(postTitle, that.postTitle) && Objects.equals(postBody, that.postBody) && postAppUserId == that.postAppUserId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(postId, postTitle, postBody ,postAppUserId);
    }

}
