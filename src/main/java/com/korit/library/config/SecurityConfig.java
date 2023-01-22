package com.korit.library.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/static/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.formLogin().disable();
//          .loginPage("/account/login") // 로그인 페이지 get요청
//          .loginProcessingUrl("/account/login") // 로그인 인증 post 요청
//          .failureForwardUrl("/account/login/error")
//          .defaultSuccessUrl("/index");
        /* 401, 403 예외 핸들링 */
        http.exceptionHandling()
            .authenticationEntryPoint(null)
            .accessDeniedHandler(null);

        /* 세션 사용 제한 */
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        /* 요청 권한 설정 */
        http.authorizeRequests()
                .antMatchers("/account/login", "/account/register")
                .permitAll()
                .antMatchers("/admin/**")
                .hasRole("ADMIN")   // ROLE_ADMIN, ROLE_MANAGER
                .anyRequest()
                .authenticated();

        http.apply(null)
                .and()
                .build();

//
    }
}
