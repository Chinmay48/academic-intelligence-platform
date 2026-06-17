package com.aip.academic_intelligence_platform.security;

import com.aip.academic_intelligence_platform.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSignKey(){
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
    public String generateToke(User user){

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("userId", user.getId())
                .claim("name", user.getName())
                .claim("role", user.getRole().name())
                .claim(
                        "departmentId",
                        user.getDepartment() != null
                                ? user.getDepartment().getId()
                                : null
                )
                .claim(
                        "departmentName",
                        user.getDepartment() != null
                                ? user.getDepartment().getName()
                                : null
                )
                .claim("year", user.getYear())
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtExpiration
                        )
                )
                .signWith(getSignKey())
                .compact();
    }


    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {

        final  String username=extractUsername(token);
        return username.equals(userDetails.getUsername() )&& !isTokenExpired(token);
    }
    public String extractRole(String token){

        return extractAllClaims(token)
                .get("role", String.class);
    }
    public String extractDepartmentId(String token){

        return extractAllClaims(token)
                .get("departmentId", String.class);
    }
    public Integer extractYear(String token){

        return extractAllClaims(token)
                .get("year", Integer.class);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    private boolean isTokenExpired(String token){
        return  extractAllClaims(token).getExpiration().before(new Date());
    }
}

