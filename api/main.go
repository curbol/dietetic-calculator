package main

import (
	"context"
	"fmt"

	prisma "dietetic-calculator/api/generated/prisma-client"
)

func main() {
	client := prisma.New(nil)

	unitCategories, err := client.UnitCategories(nil).Exec(context.TODO())
	if err != nil {
		panic(err)
	}
	fmt.Printf("Unit Categories: %+v\n", unitCategories)
}
