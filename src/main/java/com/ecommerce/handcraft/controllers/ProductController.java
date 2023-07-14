package com.ecommerce.handcraft.controllers;

import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.ImageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import com.ecommerce.handcraft.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private ProductRepository productRepository;
    private ProductService productService;

    @Autowired
    public ProductController(ProductRepository productRepository,ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping("/getImages")
    public List<String> getImages(@RequestParam Long productId) throws Exception {
        return productService.getAllImages(productId);
    }

}
