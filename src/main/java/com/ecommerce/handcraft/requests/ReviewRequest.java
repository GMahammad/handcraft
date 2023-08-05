package com.ecommerce.handcraft.requests;

public class ReviewRequest {
    private String reviewBody;
    private Double ranking;
    private Long productId;
    private String userEmail;

    public Double getRanking() {
        return ranking;
    }

    public String getReviewBody() {
        return reviewBody;
    }

    public Long getProductId() {
        return productId;
    }

    public String getUserEmail() {
        return userEmail;
    }
}
