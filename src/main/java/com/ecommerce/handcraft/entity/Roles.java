package com.ecommerce.handcraft.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Table(name = "roles")
@Data
@Entity
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long role_id;
    @Enumerated(EnumType.STRING)
    private RolesEnum roleName;
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinTable(
            name = "user_roles",joinColumns = @JoinColumn(name = "role_id"),inverseJoinColumns = @JoinColumn(name="user_id")
    )
    private List<User> users;
    @Override
    public String toString() {
        return "Roles{" +
                "roleId=" + role_id +
                ", roleName=" + roleName +
                // Avoid printing users to prevent recursion
                // ", users=" + users +
                '}';
    }
}
