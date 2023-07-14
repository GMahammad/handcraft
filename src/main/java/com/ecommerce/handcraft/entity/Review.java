package com.ecommerce.handcraft.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table(name = "review")
@Entity(name = "Review")
@Data
public class Review {
    @SequenceGenerator(name = "review_id_seq", sequenceName = "review_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_id_seq")
    @Column(name = "review_id")
    @Id
    private final Long reviewId;
    @Column(name = "review_body")
    private String reviewBody;
    @Column(name = "ranking", nullable = false)
    private Double ranking;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "profileId")
    private Profile profile;
}
