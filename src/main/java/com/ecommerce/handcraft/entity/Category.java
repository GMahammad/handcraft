package com.ecommerce.handcraft.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.util.*;

@Table(name = "category")
@Entity(name = "Category")
@Data
public class Category {
    @Id
    @SequenceGenerator(name = "category_id_seq", sequenceName = "category_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_id_seq")
    @Column(name = "category_id")
    private Long categoryId;
    @Column(name = "category_name", nullable = false)
    private String categoryName;
    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> products = new ArrayList<>();

    public Category(Long categoryId, String categoryName, List<Product> products) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.products = products;
    }

    public Category() {
    }
}
