package com.ecommerce.handcraft.controllers;

import com.ecommerce.handcraft.entity.Checkout;
import com.ecommerce.handcraft.requests.PaymentInfoRequest;
import com.ecommerce.handcraft.response.PaymentIntentResponse;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.ecommerce.handcraft.services.CheckoutService;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/payment-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(@RequestBody PaymentInfoRequest paymentInfoRequest) throws Exception{
        PaymentIntentResponse paymentIntent = checkoutService.createPaymentIntent(paymentInfoRequest);
        String paymentStr = paymentIntent.getPaymentIntent();
        Long checkoutId = paymentIntent.getCheckoutId();
        PaymentIntentResponse paymentIntentResponse = new PaymentIntentResponse(paymentStr,checkoutId);
        return new ResponseEntity<>(paymentIntentResponse, HttpStatus.OK);
    }
    @PutMapping("/payment-complete")
    public ResponseEntity<?> stripePaymentComplete(@RequestParam Long checkoutId)throws Exception{
        return checkoutService.stripePayment(checkoutId);
    }
}
