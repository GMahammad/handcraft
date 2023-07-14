package com.ecommerce.handcraft.services;
import java.util.*;

import com.ecommerce.handcraft.entity.Image;
import com.ecommerce.handcraft.entity.Product;
import com.ecommerce.handcraft.repository.ImageRepository;
import com.ecommerce.handcraft.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductService {
    private ImageRepository imageRepository;
    private ProductRepository productRepository;

    public ProductService(ImageRepository imageRepository, ProductRepository productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }



    public List<String> getAllImages(Long productId) throws Exception{
        List<Image> images = imageRepository.findByProductProductId(productId);
        List<String> imageUrls = new ArrayList<>(images.size());
        if(images.isEmpty()){
            throw new Exception("There is not any image by given id");
        }
        for(Image image : images){
            imageUrls.add(image.getImageURL());
        }
        return imageUrls;
    }

}
