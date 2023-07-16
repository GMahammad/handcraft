package com.ecommerce.handcraft.requests;

import lombok.Data;

@Data
public class MessageRequest {
    private String messageEmail;
    private String messageTitle;
    private String messageName;
    private String messageBody;
    private String messagePhone;
}
