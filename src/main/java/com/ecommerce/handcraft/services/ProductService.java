package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Category;
import com.ecommerce.handcraft.entity.Image;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.ImageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
