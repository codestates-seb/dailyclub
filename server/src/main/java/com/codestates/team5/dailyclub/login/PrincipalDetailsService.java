package com.codestates.team5.dailyclub.login;

import com.codestates.team5.dailyclub.user.entity.User;
import com.codestates.team5.dailyclub.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    //특정 에러 발생시키는 것 해보기
    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException { // 유저를 불러와서 userDetails로 반환
        User user = userRepository.findByLoginId(loginId);
        if (user == null) throw new UsernameNotFoundException("해당 ID가 존재하지 않습니다.");
        return new PrincipalDetails(user);
    }
}
