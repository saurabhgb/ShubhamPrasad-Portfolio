#include <stdio.h>

int main() {
    int num, count = 0;

    // Input an integer
    printf("Enter an integer: ");
    scanf("%d", &num);

    // Count the number of digits
    while (num != 0) {
        num /= 10;
        count++;
    }

    // Output the number of digits
    printf("The number of digits is: %d\n", count);

    return 0;
}
