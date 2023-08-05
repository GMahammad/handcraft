package com.ecommerce.handcraft.controllers;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.entity.Review;
import com.ecommerce.handcraft.repository.ReviewRepository;
import com.ecommerce.handcraft.requests.ReviewRequest;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.ecommerce.handcraft.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private ReviewService reviewService;
    private ReviewRepository reviewRepository;
    public ReviewController(ReviewService reviewService,ReviewRepository reviewRepository) {
        this.reviewService = reviewService;
        this.reviewRepository = reviewRepository;
    }

    @PostMapping("/addreview")
    public void addReview(@RequestBody ReviewRequest reviewRequest) throws Exception{
       try{
           reviewService.addReview(reviewRequest.getUserEmail(), reviewRequest.getProductId(), reviewRequest.getReviewBody(), reviewRequest.getRanking());
       }catch (Exception e){
           throw new Exception(e.getMessage());
       }
    }

}
