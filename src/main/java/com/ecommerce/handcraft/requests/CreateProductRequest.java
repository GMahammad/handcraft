package com.ecommerce.handcraft.requests;

import javax.validation.constraints.NotNull;
import java.util.List;

public class CreateProductRequest {
    private String productName;
    private String productDescription;
    private Integer price;
    private Integer discount;
    private Long categoryId;
    private List<Long> colorIds;
    private List<String> imageUrls;

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public String getProductName() {
        return productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public List<Long> getColorIds() {
        return colorIds;
    }
}
