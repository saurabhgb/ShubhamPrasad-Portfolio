#include <stdio.h>

int main() {
    int a, b;

    // Input two numbers
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);

    // Swapping without using a third variable
    a = a + b;
    b = a - b;
    a = a - b;

    // Output the swapped numbers
    printf("After swapping: a = %d, b = %d\n", a, b);

    return 0;
}
