package com.ecommerce.handcraft.controllers;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.ProductRepository;
import com.ecommerce.handcraft.requests.CreateProductRequest;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.ecommerce.handcraft.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final ProductService productService;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductService productService) {
        this.productRepository = productRepository;
        this.productService = productService;
    }

    @GetMapping("/getImages")
    public List<String> getImages(@RequestParam Long productId) throws Exception {
        return productService.getAllImages(productId);
    }

    @DeleteMapping("/admin/deleteproduct")
    public ResponseEntity<?> deleteProduct(@Valid @RequestParam Long productId) throws Exception {
        try {
            productRepository.deleteById(productId);
            return ResponseHandler.generateResponse("Product deleted successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @PostMapping("/admin/createproduct")
    public ResponseEntity<?> createProduct(@RequestBody CreateProductRequest createProductRequest) throws Exception {
        try {
            productService.addProduct(createProductRequest);
            return ResponseHandler.generateResponse("Product added successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Product could not be added! Something went wrong!" + e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

    @PutMapping("/admin/editproduct")
    public ResponseEntity<?> updateProducts(@RequestParam Long productId, @RequestBody CreateProductRequest createProductRequest) throws Exception{
        try {
            productService.updateProduct(productId,createProductRequest);
            return ResponseHandler.generateResponse("Product updated successfully!", HttpStatus.OK, null);
        } catch (Exception e) {
            return ResponseHandler.generateResponse("Product could not be updated! Something went wrong!" + e.getMessage(), HttpStatus.MULTI_STATUS, null);
        }
    }

}
