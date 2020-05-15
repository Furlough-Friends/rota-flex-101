package com.rota.auth;

import com.rota.api.StaffService;
import com.rota.database.orm.staff.Staff;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

public class RoleFilter extends OncePerRequestFilter {

  private static final List<String> SKIP_URLS = Arrays.asList(
      "/**/swagger-ui.html**",
      "/**/swagger-ui/**",
      "/**/swagger-resources/**"
  );
  private static final String INSUFFICIENT_ROLE_MESSAGE = "Insufficient privileges";

  @Autowired
  private StaffService staffService;

  @Autowired
  private Authentication authentication;

  @SneakyThrows
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                  FilterChain filterChain) {

    try {
      final String userEmail = authentication.getEmailFromToken();
      this.setUserContext(userEmail);
      filterChain.doFilter(request, response);
    } catch (SecurityException e) {
      SecurityContextHolder.clearContext();
      throw e;
    } catch (Exception e) {
      SecurityContextHolder.clearContext();
      throw new SecurityException(INSUFFICIENT_ROLE_MESSAGE, e);
    }
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    final String servletPath = request.getServletPath();
    if (servletPath == null) {
      return false;
    } else {
      return SKIP_URLS.stream().anyMatch(p -> new AntPathMatcher().match(p, servletPath));
    }
  }

  private void setUserContext(String staffEmail) {
    Staff user = staffService.findStaffByEmail(staffEmail)
        .orElseThrow(() -> new SecurityException(INSUFFICIENT_ROLE_MESSAGE));
    final String role = user.getRole().toString();
    final Set<GrantedAuthority> authorities = new HashSet<>();
    authorities.add(new SimpleGrantedAuthority(role));
    SecurityContextHolder.getContext().setAuthentication(
        new JwtAuthenticationToken(
            ((JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication())
                .getToken(),
            authorities,
            SecurityContextHolder.getContext().getAuthentication().getName()));
  }

}
