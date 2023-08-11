package learn.microstackoverflow.models;

import java.util.Objects;

public class Reply {
    private int replyId;
    private String replyBody;
    private int postId;
    private int postAppUserId;

    public Reply() {}

    public Reply(int replyId, String replyBody, int postId, int postAppUserId) {
        this.replyId = replyId;
        this.replyBody = replyBody;
        this.postId = postId;
        this.postAppUserId = postAppUserId;
    }

    public int getReplyId() {
        return replyId;
    }

    public void setReplyId(int replyId) {
        this.replyId = replyId;
    }

    public String getReplyBody() {
        return replyBody;
    }

    public void setReplyBody(String replyBody) {
        this.replyBody = replyBody;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getPostAppUserId() {
        return postAppUserId;
    }

    public void setPostAppUserId(int postAppUserId) {
        this.postAppUserId = postAppUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Reply that = (Reply) o;
        return replyId == that.replyId && Objects.equals(replyBody, that.replyBody) && postId == that.postId && postAppUserId == that.postAppUserId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(replyId, replyBody , postId, postAppUserId);
    }

}
