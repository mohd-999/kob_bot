package com.kob.backend.controller.user.center;

import com.kob.backend.pojo.User;
import com.kob.backend.service.user.center.GetNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetNameController {
    @Autowired
    GetNameService getNameService;

    @GetMapping("/api/user/center/get/name/")
    public User getName() {
        return getNameService.getName();
    }
}
