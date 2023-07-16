package com.ecommerce.handcraft.controllers;

import com.ecommerce.handcraft.repository.MessageRepository;
import com.ecommerce.handcraft.requests.MessageRequest;
import com.ecommerce.handcraft.services.MessageService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageRepository messageRepository;
    private final MessageService messageService;

    public MessageController(MessageRepository messageRepository, MessageService messageService) {
        this.messageRepository = messageRepository;
        this.messageService = messageService;
    }

    @PostMapping("/sendmessage")
    public void sendMessage(@RequestBody MessageRequest request) throws Exception {
        messageService.sendMessageToAdmin(
                request.getMessageEmail(),
                request.getMessageTitle(),
                request.getMessageName(),
                request.getMessageBody(),
                request.getMessagePhone());
    }
}
