package com.ecommerce.handcraft.response;

import com.stripe.model.PaymentIntent;

public class PaymentIntentResponse {
    private String paymentIntent;
    private Long checkoutId;

    public PaymentIntentResponse(String paymentIntent, Long checkoutId) {
        this.paymentIntent = paymentIntent;
        this.checkoutId = checkoutId;
    }

    public String getPaymentIntent() {
        return paymentIntent;
    }

    public Long getCheckoutId() {
        return checkoutId;
    }

    public void setCheckoutId(Long checkoutId) {
        this.checkoutId = checkoutId;
    }
}
