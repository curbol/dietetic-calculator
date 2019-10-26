package tmp

import (
	"context"
	main "dietetic-calculator/api"
	"dietetic-calculator/api/server"
)

type Resolver struct{}

type queryResolver struct{ *Resolver }

func (r *Resolver) Query() server.QueryResolver {
	return &queryResolver{r}
}

func (r *queryResolver) UnitCategories(ctx context.Context) ([]*main.UnitCategory, error) {
	return r.Prisma.UnitCategories(nil).Exec(ctx)
}
func (r *queryResolver) Units(ctx context.Context) ([]*main.Unit, error) {
	return r.Prisma.Units(nil).Exec(ctx)
}
