package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;
@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    List<Review> findByProduct(Product product);
}
