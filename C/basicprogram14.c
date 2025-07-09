#include <stdio.h>

int main() {
    int num, reversed = 0;

    // Input an integer
    printf("Enter an integer: ");
    scanf("%d", &num);

    // Reverse the number
    while (num != 0) {
        int digit = num % 10;
        reversed = reversed * 10 + digit;
        num /= 10;
    }

    // Output the reversed number
    printf("The reversed number is: %d\n", reversed);

    return 0;
}
