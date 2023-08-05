package com.ecommerce.handcraft.entity;
import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Table(name = "product")
@Entity(name = "Product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "product_id_seq")
    @Column(name = "product_id")
    private Long productId;
    @Column(name = "product_name",nullable = false)
    private String productName;
    @Column(name = "product_description",length = Integer.MAX_VALUE)
    private String productDescription;
    @Column(name = "discount")
    private Integer discount;
    @Column(name = "price",nullable = false)
    private Integer price;
    @Column(name="discounted_price")
    private Double discountedPrice;
    @Column(name="created_at")
    private LocalDateTime createdAt;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "category_id")
    private Category category;
    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Image> images;
    @ManyToMany
    @JoinTable(
             name = "product_color",joinColumns = @JoinColumn(name = "product_id"),inverseJoinColumns = @JoinColumn(name="color_id")
    )
    private List<Color> colors;
    @OneToMany(mappedBy = "product",cascade = CascadeType.REMOVE)
    private List<Review> reviews;

    public Product() {
    }
}
