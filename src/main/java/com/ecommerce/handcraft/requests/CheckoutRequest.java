package com.ecommerce.handcraft.requests;

import com.ecommerce.handcraft.entity.CheckoutBill;
import lombok.Data;

@Data
public class CheckoutRequest {
    private String firstName;
    private String lastName;
    private String street;
    private String apartment;
    private String city;
    private String zip;
    private String email;
    private String phone;
    private CheckoutBill checkoutBill;
}
