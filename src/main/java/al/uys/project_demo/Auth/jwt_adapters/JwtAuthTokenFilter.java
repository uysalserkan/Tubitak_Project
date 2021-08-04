package al.uys.project_demo.Auth.jwt_adapters;

import al.uys.project_demo.Auth.services.UserDetailsServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@NoArgsConstructor
public class JwtAuthTokenFilter extends OncePerRequestFilter {

  private JwtProvider jwtProvider;
  private UserDetailsServiceImpl userDetailsService;

  public JwtAuthTokenFilter(JwtProvider jwtProvider, UserDetailsServiceImpl userDetailsService) {
    this.jwtProvider = jwtProvider;
    this.userDetailsService = userDetailsService;
  }

  private String getJwtToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader != null && authHeader.startsWith("Bearer ")) {
      return authHeader.replace("Bearer ", "");
    }
    return null;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String jwt = getJwtToken(request);
      if (jwt != null && jwtProvider.validateJwtToken(jwt)) {
        String username = jwtProvider.getUsernameFromJwtToken(jwt);
        UserDetails user = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
    } catch (Exception e) {
      logger.error("Cannot authentication, MESSAGE -> {}", e);
    }

    filterChain.doFilter(request, response);
  }
}
