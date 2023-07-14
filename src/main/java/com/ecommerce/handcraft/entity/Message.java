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
    private final Long messageId;
    @Column(name = "message_email",nullable = false)
    private String messageEmail;
    @Column(name = "message_title")
    private String messageTitle;
    @Column(name = "message_body",nullable = false)
    private String messageBody;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
