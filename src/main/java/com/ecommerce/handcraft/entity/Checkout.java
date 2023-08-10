package com.ecommerce.handcraft.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "checkout")
@Entity(name = "Checkout")
@Data
public class Checkout{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkoutId;
    private String firstName;
    private String lastName;
    private String streetAddress;
    private String apartmentAddress;
    private String city;
    private String zipCode;
    private String email;
    private String phone;
    private LocalDate createdAt;
    private CheckEnum checkEnum;
    @Column(columnDefinition = "boolean default false")
    private Boolean isPaid;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "checkoutBillId")
    private CheckoutBill checkoutBill;

}
