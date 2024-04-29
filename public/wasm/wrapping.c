#include <emscripten.h>
#include <stdio.h>
#include <string.h>
EMSCRIPTEN_KEEPALIVE
void printLength(const void *arr, int length)
{
    int linecount = 0;
    int i = 0;

    unsigned char *src = (unsigned char *)arr;
    for (; i < length; i++)
    {
        if (src[i] == 10)
        {
            linecount++;
        }
    }
    printf("linecount : %d\n", linecount);
}
EMSCRIPTEN_KEEPALIVE
int countColumns(const void *arr, int length)
{
    int semicolonCount = 0;
    unsigned char *src = (unsigned char *)arr;

    for (int i = 0; i < length; i++)
    {
        if (src[i] == 44)
        {
            semicolonCount = semicolonCount + 1;
        }
    }

    return semicolonCount + 1;
}

EMSCRIPTEN_KEEPALIVE
void getHeaders(const void *arr, int length, const void *res)
{
    const char *src = (const char *)arr;
    char *res2 = (char *)res;

    int startIndex = 0;
    int count = 0;
    int prevLength = -1;
    for (int i = 0; i < length; i++)
    {
        if (src[i] == ',')
        {
            int substringLength = i - startIndex;
            char substring[substringLength + 1];
            strncpy(substring, src + startIndex, substringLength);
            substring[substringLength] = '\n';
            strcpy(res2 + prevLength + 1, substring);
            prevLength = prevLength + substringLength + 1;
            count = count + 1;
            startIndex = i + 1;
        }
    }
    if (startIndex != length)
    {
        int substringLength = length - startIndex;
        char substring[substringLength + 1];
        strncpy(substring, src + startIndex, substringLength);
        substring[substringLength] = '\n';
        strcpy(res2 + prevLength + 1, substring);
        prevLength = prevLength + substringLength + 1;
    }
    res2[prevLength + 1] = '\0';

    return;
}
