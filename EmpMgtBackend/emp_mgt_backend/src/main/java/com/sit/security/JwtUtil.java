package com.sit.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // Secret key must be at least 32 characters
    private static final String SECRET =
            "MySecretKeyMySecretKeyMySecretKey12345";

    private final Key key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    // Generate JWT Token
    public String generateToken(String username) {

        return Jwts.builder()

                .setSubject(username)

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60 * 10
                        )
                )

                .signWith(key, SignatureAlgorithm.HS256)

                .compact();
    }

    // Extract Username
    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }

    // Extract Expiration Date
    public Date extractExpiration(String token) {

        return extractClaims(token).getExpiration();
    }

    // Extract All Claims
    public Claims extractClaims(String token) {

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }

    // Check Token Expired
    public boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    // Validate Token
    public boolean validateToken(
            String token,
            UserDetails userDetails) {

        final String username =
                extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }
}