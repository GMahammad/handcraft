package com.ecommerce.handcraft.repository;

import com.ecommerce.handcraft.entity.Roles;
import com.ecommerce.handcraft.entity.RolesEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository<Roles,Long> {
    Optional<Roles> findByRoleName(RolesEnum roleName);
}
