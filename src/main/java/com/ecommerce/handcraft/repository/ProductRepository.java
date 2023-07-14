package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByProductNameContainingIgnoreCase(@RequestParam("productName") String productName, Pageable pageable);
    List<Product> findByProductNameContainingIgnoreCaseAndCategory(String productName, Category category);
}
