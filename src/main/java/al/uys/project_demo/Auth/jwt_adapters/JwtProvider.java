package al.uys.project_demo.Auth.jwt_adapters;

import al.uys.project_demo.Auth.models.AdminPrinciple;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {
  private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.secret.expiration}")
  private Long expiration;

  public String generateJwtToken(Authentication authentication) {
    AdminPrinciple adminPrinciple = (AdminPrinciple) authentication.getPrincipal();
    return Jwts.builder()
        .setSubject(adminPrinciple.getUsername())
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + expiration))
        .signWith(SignatureAlgorithm.HS512, secretKey)
        .compact();
  }

  public String getUsernameFromJwtToken(String token) {
    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
  }

  public Boolean validateJwtToken(String token) {
    try {
      Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
      return true;
    } catch (SignatureException
        | UnsupportedJwtException
        | IllegalArgumentException
        | MalformedJwtException
        | ExpiredJwtException e) {
      logger.error("Invalid JWT signature -> Message {}", e.getMessage());
    }

    return false;
  }
}
