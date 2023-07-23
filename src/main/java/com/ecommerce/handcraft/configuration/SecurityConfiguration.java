package com.ecommerce.handcraft.configuration;


import com.ecommerce.handcraft.utils.AuthEntryPointJwt;
import com.ecommerce.handcraft.utils.AuthTokenFilter;
import com.ecommerce.handcraft.utils.services.UserDetailsServiceImpl;
import com.okta.spring.boot.oauth.Okta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;


@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {
// (securedEnabled = true,
// jsr250Enabled = true,
// prePostEnabled = true) // by default
        @Autowired
UserDetailsServiceImpl userDetailsService;

        @Autowired
        private AuthEntryPointJwt unauthorizedHandler;

        @Bean
        public AuthTokenFilter authenticationJwtTokenFilter() {
            return new AuthTokenFilter();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
            DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

            authProvider.setUserDetailsService(userDetailsService);
            authProvider.setPasswordEncoder(passwordEncoder());

            return authProvider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
            return authConfig.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
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
