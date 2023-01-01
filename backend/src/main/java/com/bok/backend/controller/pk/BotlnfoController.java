package com.bok.backend.controller.pk;

import org.springframework.jmx.export.metadata.ManagedOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotlnfoController {

    @RequestMapping("getbotinofo/")
    public Map<String, String> getBotInfo() {

        Map<String, String> map = new HashMap<>();
        map.put("name", "tiger");
        map.put("rating", "1500");
        return map;
    }
}
