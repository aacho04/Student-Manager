package com.studentmanager.analytics.controller;

import com.studentmanager.analytics.dto.PerformanceRequest;
import com.studentmanager.analytics.dto.PerformanceResponse;
import com.studentmanager.analytics.dto.StudentSnapshot;
import com.studentmanager.analytics.dto.SummaryRequest;
import com.studentmanager.analytics.dto.SummaryResponse;
import com.studentmanager.analytics.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/performance")
    public ResponseEntity<PerformanceResponse> classify(@RequestBody PerformanceRequest request) {
        String classification = analyticsService.classifyPerformance(request.getAverage());
        return ResponseEntity.ok(new PerformanceResponse(classification));
    }

    @PostMapping("/summary")
    public ResponseEntity<SummaryResponse> summary(@RequestBody SummaryRequest request) {
        List<StudentSnapshot> students = request.getStudents() == null ? Collections.emptyList() : request.getStudents();

        SummaryResponse response = new SummaryResponse(
                analyticsService.topStudents(students, 3),
                analyticsService.overallAverage(students),
                analyticsService.overallAttendance(students)
        );

        return ResponseEntity.ok(response);
    }
}
