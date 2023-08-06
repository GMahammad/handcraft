package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Homepage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomepageRepository extends JpaRepository<Homepage,Long> {

}
