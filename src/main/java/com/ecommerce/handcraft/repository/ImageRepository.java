package com.ecommerce.handcraft.repository;
import java.util.*;
import com.ecommerce.handcraft.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

@Repository
public interface ImageRepository extends JpaRepository<Image,Long> {
    List<Image> findByProductProductId(Long productId);
    void deleteByProductProductId(Long productId);

}
