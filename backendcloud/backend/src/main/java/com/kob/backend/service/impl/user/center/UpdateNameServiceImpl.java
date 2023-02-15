package com.kob.backend.service.impl.user.center;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.center.UpdateNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UpdateNameServiceImpl implements UpdateNameService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public Map<String, String> update(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();
        User user = loginUser.getUser();

        String username = data.get("username");
        String email = data.get("email");
        String introduction = data.get("introduction");

        Map<String, String> map = new HashMap<>();
        if (username == null) {
            map.put("error_message", "用户名不能为空");
            return map;
        }
        username = username.trim();
        if (username.length() == 0) {
            map.put("error_message", "用户名不能为空");
            return map;
        }
        if (username.length() > 20) {
            map.put("error_message", "用户名不能大于20");
            return map;
        }
        if (email.length() > 30) {
            map.put("error_message", "邮箱不能大于30");
            return map;
        }
        if (introduction == null || introduction.length() == 0) {
            introduction = "这个用户很懒，什么也没留下！！";
        }
        if (introduction.length() > 300) {
            map.put("error_message", "简介不能大于300");
            return map;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.ne("id", user.getId()).eq("username", username);
        List<User> users = userMapper.selectList(queryWrapper);
        if (!users.isEmpty()) {
            map.put("error_message", "用户名已存在");
            return map;
        }

        User new_user = new User(
                user.getId(),
                username,
                user.getPassword(),
                email,
                introduction,
                user.getPhoto(),
                user.getRating()
        );
        userMapper.updateById(new_user);

        map.put("error_message", "success");
        return map;
    }
}
