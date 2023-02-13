package com.kob.backend.service.impl.user.center;

import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.center.UpdatePasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UpdatePasswordServiceImpl implements UpdatePasswordService {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        String password = data.get("password");
        String new_password = data.get("new_password");
        String confirmedPassword = data.get("confirmedPassword");

        Map<String, String> map = new HashMap<>();

        if (new_password == null || new_password.length() == 0) {
            map.put("error_message", "新密码不能为空");
            return map;
        }
        if (confirmedPassword == null || confirmedPassword.length() == 0) {
            map.put("error_message", "确认密码不能为空");
            return map;
        }
        if (new_password.length() > 20 || confirmedPassword.length() > 20) {
            map.put("error_message", "新密码不能大于20");
            return map;
        }
        if (!new_password.equals(confirmedPassword)) {
            map.put("error_message", "两次输入的密码不一致");
            return map;
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {//  判断旧密码是否一致
            map.put("error_message", "旧密码不正确");
            return map;
        }

        String encodedPassword = passwordEncoder.encode(new_password);

        User new_user = new User(
                user.getId(),
                user.getUsername(),
                encodedPassword,
                user.getEmail(),
                user.getIntroduction(),
                user.getPhoto(),
                user.getRating()
        );
        userMapper.updateById(new_user);

        map.put("error_message", "success");
        return map;
    }
}
