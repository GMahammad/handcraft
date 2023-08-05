package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Color;
import com.ecommerce.handcraft.entity.Image;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.CategoryRepository;
import com.ecommerce.handcraft.repository.ColorRepository;
import com.ecommerce.handcraft.repository.ImageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import com.ecommerce.handcraft.requests.CreateProductRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ColorRepository colorRepository;

    public ProductService(ImageRepository imageRepository, ProductRepository productRepository, CategoryRepository categoryRepository, ColorRepository colorRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.colorRepository = colorRepository;
    }

    @PostConstruct
    public void discount() {
        List<Product> products = productRepository.findProductsWithNonZeroDiscount();
        if (!products.isEmpty()) {
            for (Product product : products) {
                Integer discount = product.getDiscount();
                Integer previousPrice = product.getPrice();
                if (discount != 0 && previousPrice != 0) {
                    product.setDiscountedPrice((previousPrice - Math.ceil((previousPrice * discount) / 100)));
                    productRepository.save(product);
                }
            }
        }
    }


    public List<String> getAllImages(Long productId) throws Exception {
        List<Image> images = imageRepository.findByProductProductId(productId);
        List<String> imageUrls = new ArrayList<>(images.size());
        if (images.isEmpty()) {
            throw new Exception("There is not any image by given id");
        }
        for (Image image : images) {
            imageUrls.add(image.getImageURL());
        }
        return imageUrls;
    }

    public void addProduct(CreateProductRequest createProductRequest) throws Exception {
        try {
            Category category = getCategoryById(createProductRequest.getCategoryId());
            List<Color> colors = getColorsByIds(createProductRequest.getColorIds());

            Product product = createProductEntity(createProductRequest, category, colors);
            product = productRepository.save(product);
            discount();
            saveImages(createProductRequest.getImageUrls(), product);
        } catch (Exception e) {
            throw new Exception("Failed to create product: " + e.getMessage());
        }
    }

    private Category getCategoryById(Long categoryId) throws Exception {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new Exception("Category with ID " + categoryId + " not found."));
    }

    private List<Color> getColorsByIds(List<Long> colorIds) throws Exception {
        return colorRepository.findAllById(colorIds);
    }

    private Product getProductById(Long productId) throws Exception{
        return productRepository.findById(productId).orElseThrow(()-> new Exception("Product with ID can not be found"));
    }
    private Product createProductEntity(CreateProductRequest createProductRequest, Category category, List<Color> colors) {
        Product product = new Product();
        product.setProductName(createProductRequest.getProductName());
        product.setProductDescription(createProductRequest.getProductDescription());
        product.setPrice(createProductRequest.getPrice());
        product.setDiscount(createProductRequest.getDiscount());
        product.setCategory(category);
        product.setColors(colors);
        product.setCreatedAt(LocalDateTime.now());
        return product;
    }

    private void saveImages(List<String> imageUrls, Product product) {
        List<Image> images = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            Image image = new Image();
            image.setImageURL(imageUrl);
            image.setProduct(product);
            images.add(image);
        }
        imageRepository.saveAll(images);
    }

    public void updateProduct(Long productId, CreateProductRequest createProductRequest) throws Exception {
        Product product = getProductById(productId);
        Category category = getCategoryById(createProductRequest.getCategoryId());
        List<Color> colors = getColorsByIds(createProductRequest.getColorIds());

        product.setProductName(createProductRequest.getProductName());
        product.setProductDescription(createProductRequest.getProductDescription());
        product.setPrice(createProductRequest.getPrice());
        product.setDiscount(createProductRequest.getDiscount());
        product.setCategory(category);
        product.setColors(colors);

        productRepository.save(product);
        discount();
        imageRepository.deleteByProductProductId(product.getProductId());
        saveImages(createProductRequest.getImageUrls(),product);
    }


}
