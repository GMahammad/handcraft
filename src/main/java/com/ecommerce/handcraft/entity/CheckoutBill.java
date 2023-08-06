package com.ecommerce.handcraft.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import javax.persistence.*;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Table(name = "checkout_bill")
@Entity(name = "CheckoutBill")
@Data
public class CheckoutBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkoutBillId;
    // Use a String to store the JSON representation of the HashMap
    @JsonIgnore
    @Column(columnDefinition = "TEXT")
    private String billJson;

    // Transient field to hold the deserialized HashMap during runtime
    @Transient
    private Map<String, Integer> bill;
    private Integer totalPrice;

    public Long getCheckoutBillId() {
        return checkoutBillId;
    }

    public void setCheckoutBillId(Long checkoutBillId) {
        this.checkoutBillId = checkoutBillId;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Map<String, Integer> getBill() {
        if (bill == null) {
            // Deserialize the JSON to initialize the HashMap when accessed
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                bill = objectMapper.readValue(billJson, new TypeReference<Map<String, Integer>>() {});
            } catch (IOException e) {
                e.printStackTrace();
                bill = new HashMap<>();
            }
        }
        return bill;
    }

    public void setBill(Map<String, Integer> bill) {
        this.bill = bill;
        // Serialize the HashMap to JSON and store it in billJson
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            this.billJson = objectMapper.writeValueAsString(bill);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }
}
