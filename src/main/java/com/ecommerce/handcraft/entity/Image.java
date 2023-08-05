package com.ecommerce.handcraft.entity;

import lombok.Data;

import javax.persistence.*;
@Table(name = "image")
@Entity(name = "Image")
@Data
public class Image {
    @Id
    @Column(name = "image_id",length = Integer.MAX_VALUE)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imageId;
    @Column(name = "image_url")
    private String imageURL;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "productId")
    private Product product;
}
