package main

import (
	"context"
	prisma "dietetic-calculator/api/generated/prisma-client"
	"fmt"
)

func main() {
	client := prisma.New(nil)
	ctx := context.TODO()

	unitCategories, err := client.UnitCategories(nil).Exec(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Unit Categories: %+v\n", unitCategories)
}
