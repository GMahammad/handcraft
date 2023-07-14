package com.ecommerce.handcraft.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Table(name = "color")
@Entity(name = "Color")
@Data
public class Color {
    @Id
    @SequenceGenerator(name = "color_id_seq", sequenceName = "color_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "color_id_seq")
    @Column(name = "color_id")
    private Long colorID;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "product_color", joinColumns = @JoinColumn(name = "color_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products = new ArrayList<>();

    @Column(name = "color_name", nullable = false)
    private String colorName;
}
