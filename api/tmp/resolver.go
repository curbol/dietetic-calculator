package tmp

import (
	"context"
	main "dietetic-calculator/api"
	"dietetic-calculator/api/server"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Query() server.QueryResolver {
	return &queryResolver{r}
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) UnitCategories(ctx context.Context) ([]*main.UnitCategory, error) {
	panic("not implemented")
}
func (r *queryResolver) Units(ctx context.Context) ([]*main.Unit, error) {
	panic("not implemented")
}
