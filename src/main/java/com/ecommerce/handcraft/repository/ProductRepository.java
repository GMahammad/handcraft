package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByProductNameContainingIgnoreCaseAndCategoryAndPriceBetween(@Param("productName") String productName, @Param("category") Category category, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCaseAndCategory(@Param("productName") String productName,@Param("category") Category category, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCaseAndPriceBetween(@Param("productName") String productName, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByCategoryAndPriceBetween(@Param("category") Category category, Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByPriceBetween(Integer minPrice, Integer maxPrice, Pageable pageable) throws Exception;

    Page<Product> findByProductNameContainingIgnoreCase(@RequestParam("productName") String productName, Pageable pageable) throws Exception;

    Page<Product> findByCategory(@Param("category") Category category, Pageable pageable) throws Exception;


}
