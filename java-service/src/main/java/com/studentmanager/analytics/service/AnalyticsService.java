package com.studentmanager.analytics.service;

import com.studentmanager.analytics.dto.StudentSnapshot;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class AnalyticsService {

    public String classifyPerformance(double average) {
        if (average >= 90) {
            return "Outstanding";
        }
        if (average >= 75) {
            return "Good";
        }
        if (average >= 50) {
            return "Average";
        }
        return "Needs Improvement";
    }

    public List<StudentSnapshot> topStudents(List<StudentSnapshot> students, int limit) {
        return students.stream()
                .sorted(Comparator.comparingDouble(StudentSnapshot::getAverage).reversed())
                .limit(limit)
                .toList();
    }

    public double overallAverage(List<StudentSnapshot> students) {
        return students.stream().mapToDouble(StudentSnapshot::getAverage).average().orElse(0.0);
    }

    public double overallAttendance(List<StudentSnapshot> students) {
        return students.stream().mapToDouble(StudentSnapshot::getAttendancePercentage).average().orElse(0.0);
    }
}
