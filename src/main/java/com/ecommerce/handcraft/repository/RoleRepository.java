package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Roles;
import com.ecommerce.handcraft.entity.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Roles,Long> {
    Optional<Roles> findByRoleName(RolesEnum roleName);
}
