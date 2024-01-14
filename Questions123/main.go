package main

import (
	"fmt"
	"sort"
	"strings"
)

func Question1(words []string) []string {
	sort.Slice(words, func(i, j int) bool {
		countA := strings.Count(words[i], "a")
		countB := strings.Count(words[j], "a")

		if countA == countB {
			return len(words[i]) > len(words[j])
		}
		return countA > countB
	})

	return words
}

func Question2(num int) {
	if num > 1 {
		Question2(num / 2)
		fmt.Println(num)
	}
}

func Question3(arr []string) string {
	countMap := make(map[string]int)

	for _, item := range arr {
		countMap[item]++
	}

	var maxCount int
	var mostRepeated string

	for key, count := range countMap {
		if count > maxCount {
			maxCount = count
			mostRepeated = key
		}
	}

	return mostRepeated
}

func main() {
	// Test Question1
	inputWords := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}
	outputWords := Question1(inputWords)
	fmt.Println(outputWords)

	fmt.Println("*************************************")

	//Test Question2
	var userInput int
	fmt.Print("Please enter a number: ")
	_, err := fmt.Scan(&userInput)
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}
	Question2(userInput)

	fmt.Println("*************************************")

	//Test Question3
	inputArray := []string{"apple", "pie", "apple", "red", "red", "red"}
	result := Question3(inputArray)
	fmt.Println(result)
}
