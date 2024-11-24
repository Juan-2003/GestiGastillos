package com.example.gestiGastillos.infra;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .authorizeHttpRequests()
                .anyRequest()
                .permitAll()
                .and()
                .httpBasic();
        return httpSecurity.build();
    }

    //Configuracion para la implementacion del dialecto de la base de datos
    @Bean
    public DataSource dataSource() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.sqlite.JDBC");
        dataSource.setUrl("jdbc:sqlite:C:/Users/PC/Desktop/App/GestiGastillos/gestiGastillos/gestiGastillos.db");//Ruta de la base de datos
        return dataSource;
    }
}
