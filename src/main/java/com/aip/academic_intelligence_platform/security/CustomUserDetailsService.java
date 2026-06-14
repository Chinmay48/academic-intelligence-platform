package com.aip.academic_intelligence_platform.security;


import com.aip.academic_intelligence_platform.user.UserRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
     private  final UserRespository userRespository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       return userRespository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User not found with email: "+email));
    }
}
