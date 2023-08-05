package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.*;
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByProduct(Product product);
}
