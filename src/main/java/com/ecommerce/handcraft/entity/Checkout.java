package com.ecommerce.handcraft.entity;

import lombok.Data;

import javax.persistence.*;

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
    private String district;
    private String zipCode;
    private String email;
    private String phone;
    private CheckEnum checkEnum;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "checkoutBillId")
    private CheckoutBill checkoutBill;
}
