package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Image;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.ImageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ProductService {
    private final ImageRepository imageRepository;
    private final ProductRepository productRepository;

    public ProductService(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void discount() {
        List<Product> products = productRepository.findProductsWithNonZeroDiscount();
        if (!products.isEmpty()) {
            for (Product product : products) {
                    Integer discount = product.getDiscount();
                    Integer previousPrice = product.getPrice();
                    if (discount != 0 && previousPrice != 0) {
                        product.setDiscountedPrice( (double)(previousPrice - Math.ceil( (previousPrice * discount) / 100)));
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
}
