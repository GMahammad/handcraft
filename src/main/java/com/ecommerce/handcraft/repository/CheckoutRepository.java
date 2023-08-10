package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {
}
