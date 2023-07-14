package com.ecommerce.handcraft.entity;

import javax.persistence.*;
import lombok.Data;
import java.util.*;

@Table(name = "profile")
@Entity(name = "Profile")
@Data
public class Profile {
    @SequenceGenerator(name = "profile_id_seq", sequenceName = "profile_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "profile_id_seq")
    @Id
    @Column(name = "profile_id")
    private final Long profileId;
    @Column(name = "profile_firstname")
    private String profileFirstName;
    @Column(name = "profile_lastname")
    private String profileLastName;
    @Column(name = "user_email")
    private String profileEmail;
    @Column(name = "user_phone_number")
    private String phoneNumber;
    @Column(name = "password")
    private String password;
    @OneToMany(mappedBy = "profile")
    private List<Review> reviews;
}
