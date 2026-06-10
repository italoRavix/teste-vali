package br.com.tatu.projetovali.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

@Component
public class TokenProvider {

    @Value("${jwt.expiration}")
    private Long expirationTime;



    @Value("${jwt.key}")
    private String key;


    public String gerarToken(Authentication authentication ){
      UserDetails user = (UserDetails) authentication.getPrincipal();
      return buildToken(user.getUsername());
    }


    public String buildToken (String nome){
      Date now  = new Date();
      Date expiration = new Date(now.getTime() + expirationTime);

      return Jwts.builder()
                       .subject(nome)
                       .issuedAt(now)
                       .expiration(expiration)
                       .signWith(getSigningKey())

              .compact();
    }



   private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(key.getBytes());
    }



    public boolean isValid(String token){
        try{
            extractClaims(token);
            return true;
        }catch (Exception e){
            return false;
        }
    }




    public String extractUsername(String token){
        return extractClaims(token).getSubject();
    }



    private Claims extractClaims(String token){

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }




    private Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }





}





