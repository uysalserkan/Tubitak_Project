package al.uys.project_demo.Auth.configs;

import al.uys.project_demo.Auth.jwt_adapters.JwtAuthEntryPoint;
import al.uys.project_demo.Auth.jwt_adapters.JwtAuthTokenFilter;
import al.uys.project_demo.Auth.jwt_adapters.JwtProvider;
import al.uys.project_demo.Auth.repositories.AdminRepository;
import al.uys.project_demo.Auth.services.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityconfig extends WebSecurityConfigurerAdapter {
  UserDetailsServiceImpl userDetailsService;
  private JwtAuthEntryPoint jwtAuthEntryPoint;
  private JwtProvider jwtProvider;
  private AdminRepository adminRepository;

  public WebSecurityconfig(
      UserDetailsServiceImpl userDetailsService,
      JwtAuthEntryPoint jwtAuthEntryPoint,
      JwtProvider jwtProvider) {
    this.userDetailsService = userDetailsService;
    this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    this.jwtProvider = jwtProvider;
  }

  @Bean
  public JwtAuthTokenFilter authenticationJwtTokenFilter() {
    return new JwtAuthTokenFilter(this.jwtProvider, this.userDetailsService);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Override
  public void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
      throws Exception {
    authenticationManagerBuilder
        .userDetailsService(userDetailsService)
        .passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors()
        .and()
        .csrf()
        .disable()
        .authorizeRequests()
        .antMatchers("/auth/**")
        .permitAll()
        .antMatchers("/events/**")
        .permitAll()
        .antMatchers("/users/**")
        .permitAll()
        .antMatchers("/qrcode/**")
        .permitAll()
        .antMatchers(HttpMethod.GET)
        .hasRole("ADMIN")
        .antMatchers(HttpMethod.POST)
        .hasRole("ADMIN")
        .antMatchers(HttpMethod.PUT)
        .hasRole("ADMIN")
        .antMatchers(HttpMethod.DELETE)
        .hasRole("ADMIN")
        .anyRequest()
        .authenticated()
        .and()
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthEntryPoint)
        .and()
        .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }
}
