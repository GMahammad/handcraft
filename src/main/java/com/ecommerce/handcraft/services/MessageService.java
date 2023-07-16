package com.ecommerce.handcraft.services;

import com.ecommerce.handcraft.entity.Message;
import com.ecommerce.handcraft.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void sendMessageToAdmin(String messageEmail, String messageTitle, String messageName, String messageBody, String messagePhone) throws Exception {
        try {

            Message newMessage = new Message(messageEmail, messageTitle, messageName, messageBody, messagePhone, LocalDateTime.now());
            messageRepository.save(newMessage);
        } catch (Exception e) {
            throw new Exception("Message could not be sent: " + e.getMessage());
        }
    }
}
