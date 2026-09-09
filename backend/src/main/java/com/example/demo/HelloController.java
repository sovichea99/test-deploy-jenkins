package com.example.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // demo only — restrict this to your frontend domain in production
public class HelloController {

    // Bump this string and commit to prove the Jenkins pipeline redeployed the change
    private static final String VERSION = "v2";

    @GetMapping("/api/hello")
    public Map<String, Object> hello() {
        return Map.of(
                "message", "Hello from Spring Boot",
                "version", VERSION,
                "timestamp", Instant.now().toString()
        );
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
