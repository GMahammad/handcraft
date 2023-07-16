package com.ecommerce.handcraft.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Table(name = "message")
@Entity(name = "Message")
@Data
public class Message {
    @SequenceGenerator(name = "message_id_seq",sequenceName = "message_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "message_id_seq")
    @Id
    @Column(name = "message_id")
    private Long messageId;
    @Column(name = "message_email",nullable = false)
    private String messageEmail;
    @Column(name = "message_title")
    private String messageTitle;
    @Column(name = "message_sender_name")
    private String messageSenderName;
    @Column(name = "message_body",nullable = false)
    private String messageBody;
    @Column(name = "message_phone",nullable = false)
    private String messagePhone;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Message(String messageEmail, String messageTitle, String messageSenderName, String messageBody, String messagePhone,LocalDateTime createdAt) {
        this.messageEmail = messageEmail;
        this.messageTitle = messageTitle;
        this.messageSenderName = messageSenderName;
        this.messageBody = messageBody;
        this.messagePhone = messagePhone;
        this.createdAt = createdAt;
    }
}
