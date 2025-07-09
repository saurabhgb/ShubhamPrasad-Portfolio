#include <stdio.h>

int main() {
    int num1, num2;

    // Input two numbers
    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);

    // Determine the larger number
    if (num1 > num2) {
        printf("The larger number is: %d\n", num1);
    } else if (num2 > num1) {
        printf("The larger number is: %d\n", num2);
    } else {
        printf("Both numbers are equal.\n");
    }

    return 0;
}
