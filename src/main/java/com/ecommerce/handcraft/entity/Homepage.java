package com.ecommerce.handcraft.entity;

import com.ecommerce.handcraft.utils.ListToStringConverter;
import lombok.Data;
import java.util.*;
import javax.persistence.*;

@Table(name = "homepage")
@Entity(name = "HomePage")
@Data
public class Homepage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Convert(converter = ListToStringConverter.class)
    @Column(length = 3000)
    private List<String> carouselImages;
    private Long bannerProductId;
}
