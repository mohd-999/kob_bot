package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotlnfoController {

    @RequestMapping("getbotinfo/")
    public Map<String, String> getBotInfo() {
        Map<String, String> map = new HashMap<>();
        map.put("name", "tiger");
        map.put("ratind", "1500");
        return map;
    }
}
