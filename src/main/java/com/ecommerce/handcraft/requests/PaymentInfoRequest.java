package com.ecommerce.handcraft.requests;

import lombok.Data;

@Data
public class PaymentInfoRequest {
    private String currency;
    private CheckoutRequest checkoutRequest;
}
