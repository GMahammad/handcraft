package com.ecommerce.handcraft.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Optional;

@Table(name = "review")
@Entity(name = "Review")
@Data
public class Review {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    @Id
    private Long reviewId;
    @Column(name="user_email")
    private String userEmail;
    @Column(name = "review_body",length = Integer.MAX_VALUE)
    private String reviewBody;
    @Column(name = "ranking", nullable = false)
    private Double ranking;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REMOVE})
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "productId")
    private Product product;

    public Review() {
    }

    public Review(String userEmail, String reviewBody, Double ranking, LocalDateTime createdAt, User user, Product product) {
        this.userEmail = userEmail;
        this.reviewBody = reviewBody;
        this.ranking = ranking;
        this.createdAt = createdAt;
        this.user = user;
        this.product = product;
    }
}
