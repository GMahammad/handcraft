package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}
