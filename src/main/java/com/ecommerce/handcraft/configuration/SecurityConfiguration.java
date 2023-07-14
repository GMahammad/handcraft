package com.ecommerce.handcraft.configuration;


import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;


@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

        //  Disable Cross Site Request Forgery
        httpSecurity.csrf().disable();

        // Protect endpoints at /api/<type>/secure
        httpSecurity.authorizeRequests(configurer->configurer
                        .antMatchers("/api/products/secure/**"
                                )

                        .authenticated())
                .oauth2ResourceServer().jwt();

        // Add CORS configuration
        httpSecurity.cors();
        // Add content negotiation strategy
        httpSecurity.setSharedObject(ContentNegotiationStrategy.class,new HeaderContentNegotiationStrategy());

        // Force a non-empty response body for 401's to make the response friendly
        Okta.configureResourceServer401ResponseBody(httpSecurity);

        return httpSecurity.build();
    }
}

