package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.CheckEnum;
import com.ecommerce.handcraft.entity.Checkout;
import com.ecommerce.handcraft.repository.CheckoutRepository;
import com.ecommerce.handcraft.requests.PaymentInfoRequest;
import com.ecommerce.handcraft.response.PaymentIntentResponse;
import com.ecommerce.handcraft.response.ResponseHandler;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
@Service
@Transactional
public class CheckoutService {
    private CheckoutRepository checkoutRepository;

    @Autowired
    public CheckoutService(CheckoutRepository checkoutRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.checkoutRepository = checkoutRepository;
        Stripe.apiKey = secretKey;
    }

    private Checkout initializeCheckout(PaymentInfoRequest paymentInfoRequest) {
        Checkout checkout = new Checkout();
        checkout.setFirstName(paymentInfoRequest.getCheckoutRequest().getFirstName());
        checkout.setLastName(paymentInfoRequest.getCheckoutRequest().getLastName());
        checkout.setStreetAddress(paymentInfoRequest.getCheckoutRequest().getStreet());
        checkout.setApartmentAddress(paymentInfoRequest.getCheckoutRequest().getApartment());
        checkout.setCity(paymentInfoRequest.getCheckoutRequest().getCity());
        checkout.setZipCode(paymentInfoRequest.getCheckoutRequest().getZip());
        checkout.setEmail(paymentInfoRequest.getCheckoutRequest().getEmail());
        checkout.setPhone(paymentInfoRequest.getCheckoutRequest().getPhone());
        checkout.setCreatedAt(LocalDate.now());
        checkout.setCheckoutBill(paymentInfoRequest.getCheckoutRequest().getCheckoutBill());

        checkout.setCheckEnum(CheckEnum.PENDING);

        return checkout;
    }
    public PaymentIntentResponse createPaymentIntent(PaymentInfoRequest paymentInfoRequest) throws StripeException{
        List<String> paymentMethodTypes = new ArrayList<>();
        paymentMethodTypes.add("card");
        Map<String,Object> param = new HashMap<>();
        param.put("amount",paymentInfoRequest.getCheckoutRequest().getCheckoutBill().getTotalPrice() * 100);
        param.put("currency",paymentInfoRequest.getCurrency());
        param.put("payment_method_types",paymentMethodTypes);
        Checkout checkout = initializeCheckout(paymentInfoRequest);
        checkoutRepository.save(checkout);

        return new PaymentIntentResponse(PaymentIntent.create(param).toJson(), checkout.getCheckoutId()) ;
    }
    public ResponseEntity<?> stripePayment(Long checkoutId) throws Exception{
        Checkout checkout = checkoutRepository.findById(checkoutId).orElseThrow(()-> new Exception("Checkout bill can not be found with given ID!"));
        checkout.setIsPaid(true);
        checkoutRepository.save(checkout);
        return ResponseHandler.generateResponse("Payment processed successfully", HttpStatus.OK,null);
    }


}
