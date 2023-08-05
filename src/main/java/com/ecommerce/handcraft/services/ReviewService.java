package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.entity.Review;
import com.ecommerce.handcraft.entity.User;
import com.ecommerce.handcraft.repository.ProductRepository;
import com.ecommerce.handcraft.repository.ReviewRepository;
import com.ecommerce.handcraft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class ReviewService {
    private ReviewRepository reviewRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository,ProductRepository productRepository, UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public void addReview(String userEmail,Long productId,String reviewBody,Double ranking) throws Exception{
        User user = userRepository.findByEmail(userEmail).orElseThrow();
        Product product= productRepository.findById(productId).orElseThrow();
        Review newReview = new Review(user.getEmail(),reviewBody,ranking,LocalDateTime.now(),user,product);
        reviewRepository.save(newReview);
    }
}
