"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const opts = {
    filtering: true,
    ordering: true,
    pagination: false,
};
nexus_1.schema.objectType({
    name: 'CalculatorCategory',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.icon();
        t.model.calculators(opts);
    },
});
nexus_1.schema.objectType({
    name: 'Calculator',
    definition(t) {
        t.model.id();
        t.model.key();
        t.model.name();
        t.model.description();
        t.model.defaultOutputUnit();
        t.model.category();
        t.model.categoryId();
        t.model.inputs(opts);
        t.model.selects(opts);
    },
});
nexus_1.schema.objectType({
    name: 'Input',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.defaultUnit();
        t.model.icon();
        t.model.unitCategory();
        t.model.unitCategoryId();
        t.model.calculators(opts);
    },
});
nexus_1.schema.objectType({
    name: 'SelectOption',
    definition(t) {
        t.model.id();
        t.model.text();
        t.model.select();
        t.model.selectId();
    },
});
nexus_1.schema.objectType({
    name: 'Select',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.icon();
        t.model.options(opts);
        t.model.calculators(opts);
    },
});
nexus_1.schema.objectType({
    name: 'UnitCategory',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.units(opts);
        t.model.inputs(opts);
    },
});
nexus_1.schema.objectType({
    name: 'Unit',
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.symbol();
        t.model.factor();
        t.model.category();
        t.model.categoryId();
    },
});
nexus_1.schema.queryType({
    definition(t) {
        t.crud.calculatorCategories(opts);
        t.crud.calculators(opts);
        t.crud.inputs(opts);
        t.crud.selects(opts);
        t.crud.unitCategories(opts);
        t.crud.units(opts);
    },
});
