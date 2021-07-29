package al.uys.project_demo.Auth.configs;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class AuthConfig implements Serializable {
  private static final Long serialVersionUID = -2550185165626007488L;
  private static final Long TOKEN_EXPIRATION_TIME = 25 * 60 * 60 * 1000L; // 25 Gün not expired.

  @Value("${jwt.secret.key}")
  private String secretKey;

  // Private Methods
  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
  }

  private Boolean isTokenExpired(String token) {
    final Date expirationDate = getExpirationTimeFromToken(token);
    return expirationDate.before(new Date());
  }

  private String doGenerateToken(Map<String, Object> claims, String subject) {
    return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
        .signWith(SignatureAlgorithm.HS512, secretKey)
        .compact();
  }

  // Public Methods
  public String generateToken(UserDetails userAuth) {
    Map<String, Object> claims = new HashMap<>();
    return doGenerateToken(claims, userAuth.getUsername());
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimResolver.apply(claims);
  }

  public Boolean validateToken(String token, UserDetails userAuthDetails) {
    final String username = getUsernameFromToken(token);
    return (username.equals(userAuthDetails.getUsername()) && !isTokenExpired(token));
  }

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getExpirationTimeFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }
}
