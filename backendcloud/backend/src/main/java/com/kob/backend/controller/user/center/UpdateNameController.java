package com.kob.backend.controller.user.center;

import com.kob.backend.service.user.center.UpdateNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UpdateNameController {
    @Autowired
    private UpdateNameService updateNameService;

    @PostMapping("/api/user/center/update/name/")
    public Map<String, String> update(@RequestParam Map<String, String> data) {
        return updateNameService.update(data);
    }
}
