package com.ecommerce.handcraft.response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseHandler {


    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object object){
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("message",message);
        map.put("status",status.value());
        map.put("user",object);
        return new ResponseEntity<Object>(map,status);
    }
}
