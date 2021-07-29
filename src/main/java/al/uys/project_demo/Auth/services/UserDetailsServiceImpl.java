package al.uys.project_demo.Auth.services;

import al.uys.project_demo.Auth.models.Admin;
import al.uys.project_demo.Auth.models.AdminPrinciple;
import al.uys.project_demo.Auth.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  AdminRepository adminRepository;

  public UserDetailsServiceImpl(AdminRepository adminRepository) {
    this.adminRepository = adminRepository;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Admin admin =
        adminRepository
            .findByUsername(username)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        "User not found with %s username".formatted(username)));
    return AdminPrinciple.build(admin);
  }
}
