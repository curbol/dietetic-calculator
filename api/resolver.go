package tmp

import (
	"context"
	main "dietetic-calculator/api"
	prisma "dietetic-calculator/api/generated/prisma-client"
	"dietetic-calculator/api/server"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct {
	Prisma *prisma.Client
}

type queryResolver struct{ *Resolver }

func (r *Resolver) Query() server.QueryResolver {
	return &queryResolver{r}
}

// func (r *Resolver) UnitCategory() UnitCategoryResolver {
// 	return &unitCategoryResolver{r}
// }
// func (r *Resolver) Unit() UnitResolver {
// 	return &unitResolver{r}
// }

// func (r *Resolver) UnitCategories() UnitCategoriesResolver {
// 	return &unitCategoriesResolver{r}
// }
// func (r *Resolver) Units() unitsResolver {
// 	return &unitsResolver{r}
// }

func (r *queryResolver) UnitCategories(ctx context.Context) ([]*main.UnitCategory, error) {
	return r.Prisma.UnitCategories().Exec(ctx)
}
func (r *queryResolver) Units(ctx context.Context) ([]*main.Unit, error) {
	return r.Prisma.Units().Exec(ctx)
}
