package com.ecommerce.handcraft.controllers;

import com.ecommerce.handcraft.entity.Homepage;
import com.ecommerce.handcraft.repository.HomepageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import com.ecommerce.handcraft.requests.HomepageRequest;
import com.ecommerce.handcraft.response.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/homepage")
public class HomepageController {

    private final HomepageRepository homepageRepository;
    private final ProductRepository productRepository;

    public HomepageController(HomepageRepository homepageRepository, ProductRepository productRepository) {
        this.homepageRepository = homepageRepository;
        this.productRepository = productRepository;

    }

    @PutMapping("/update")
    public ResponseEntity<?> updateHomepage(@RequestBody HomepageRequest homepageRequest) throws Exception {
        try {

            Homepage homepage = homepageRepository.findById(1L).orElseThrow(() -> new Exception("Homepage can not be found!"));
            if (homepageRequest.getCarouselImages().size() != 0) {
                homepage.setCarouselImages(homepageRequest.getCarouselImages());
            } else {
                throw new Exception("Image is empty. Please add some images!");
            }
            if (homepageRequest.getBannerId() != null) {
                productRepository.findById(homepageRequest.getBannerId()).orElseThrow(() -> new Exception("Product with given ID does not exist!"));
                homepage.setBannerProductId(homepageRequest.getBannerId());
            } else {
                throw new Exception("Banner Id is empty. Please add Id of product!");
            }
            homepageRepository.save(homepage);
            return ResponseHandler.generateResponse("Homepage updated successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }

    }


}
