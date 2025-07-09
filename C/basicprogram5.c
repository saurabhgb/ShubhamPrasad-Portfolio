#include <stdio.h>

int main() {
    int a, b, temp;

    // Assign values to the numbers
    a = 5;
    b = 10;

    // Print original values
    printf("Before swapping: a = %d, b = %d\n", a, b);

    // Swap the values using a temporary variable
    temp = a;
    a = b;
    b = temp;

    // Print swapped values
    printf("After swapping: a = %d, b = %d\n", a, b);

    return 0;
}
