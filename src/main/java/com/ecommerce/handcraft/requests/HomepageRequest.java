package com.ecommerce.handcraft.requests;
import java.util.*;


public class HomepageRequest {
    private List<String> carouselImages;
    private Long bannerId;

    public List<String> getCarouselImages() {
        return carouselImages;
    }

    public void setCarouselImages(List<String> carouselImages) {
        this.carouselImages = carouselImages;
    }

    public Long getBannerId() {
        return bannerId;
    }

    public void setBannerId(Long bannerId) {
        this.bannerId = bannerId;
    }
}
