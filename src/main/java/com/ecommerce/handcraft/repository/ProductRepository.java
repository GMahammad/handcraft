package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Color;
import com.ecommerce.handcraft.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p WHERE p.discount <> 0")
    List<Product> findProductsWithNonZeroDiscount();
    @Query("SELECT p.colors FROM Product p WHERE p.productId = :productId")
    List<Color> findColorsByProductId(@Param("productId") Long productId);

    Page<Product> findByCategoryAndProductIdNot(Category category, Long productId, Pageable pageable);
    Page<Product> findByProductNameContainingIgnoreCaseAndCategoryAndPriceBetween(@Param("productName") String productName, @Param("category") Category category, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCaseAndCategory(@Param("productName") String productName,@Param("category") Category category, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCaseAndPriceBetween(@Param("productName") String productName, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByCategoryAndPriceBetween(@Param("category") Category category, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByPriceBetween(Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCase(@RequestParam("productName") String productName, Pageable pageable) throws Exception;

    Page<Product> findByCategory(@Param("category") Category category, Pageable pageable) throws Exception;


}
