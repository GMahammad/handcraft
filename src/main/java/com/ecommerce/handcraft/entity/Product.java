package com.ecommerce.handcraft.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Table(name = "product")
@Entity(name = "Product")
@Data
public class Product {
    @Id
    @SequenceGenerator(name = "product_id_seq",sequenceName = "product_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "product_id_seq")
    @Column(name = "product_id")
    private Long productId;
    @Column(name = "product_name",nullable = false)
    private String productName;
    @Column(name = "product_description")
    private String productDescription;
    @Column(name = "discount")
    private Integer discount;
    @Column(name = "price",nullable = false)
    private Integer price;
    @Column(name="discounted_price")
    private Double discountedPrice;
    @Column(name="rating")
    private double rating;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    private List<Image> images;

    @ManyToMany
    @JoinTable(
             name = "product_color",joinColumns = @JoinColumn(name = "product_id"),inverseJoinColumns = @JoinColumn(name="color_id")
    )
    private List<Color> colors;

}
