#include <stdio.h>
#include <math.h>

int main() {
    double a = 6.0, b = 8.0, c = 10.0;
    double s, area;

    // Calculate the semi-perimeter
    s = (a + b + c) / 2;

    // Calculate the area using Heron's formula
    area = sqrt(s * (s - a) * (s - b) * (s - c));

    // Print the area
    printf("The area of the triangle with sides %.2f, %.2f, and %.2f is %.2f square cm\n", a, b, c, area);

    return 0;
}
