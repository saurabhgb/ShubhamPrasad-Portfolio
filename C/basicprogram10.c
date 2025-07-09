#include <stdio.h>

int main() {
    int scores[5];
    int total = 0;
    float average;
    char grade;

    // Input scores for 5 subjects
    printf("Enter the scores for 5 subjects: ");
    for (int i = 0; i < 5; i++) {
        scanf("%d", &scores[i]);
        total += scores[i];
    }

    // Calculate average score
    average = total / 5.0;

    // Determine grade based on average score
    if (average >= 90) {
        grade = 'A';
    } else if (average >= 80) {
        grade = 'B';
    } else if (average >= 70) {
        grade = 'C';
    } else if (average >= 60) {
        grade = 'D';
    } else {
        grade = 'E';
    }

    // Output the grade
    printf("The grade is: %c\n", grade);

    return 0;
}
