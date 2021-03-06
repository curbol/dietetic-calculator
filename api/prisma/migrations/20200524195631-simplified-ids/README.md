# Migration `20200524195631-simplified-ids`

This migration has been generated by curbol at 5/24/2020, 7:56:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200524193957-init..20200524195631-simplified-ids
--- datamodel.dml
+++ datamodel.dml
@@ -1,24 +1,24 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator prisma_client {
   provider = "prisma-client-js"
 }
 model CalculatorCategory {
-  id          Int          @default(uuid()) @id
+  id          Int          @id
   createdAt   DateTime     @default(now())
   updatedAt   DateTime     @updatedAt
   name        String       @unique
   calculators Calculator[]
   icon        String?
 }
 model Calculator {
-  id                Int                 @default(uuid()) @id
+  id                Int                 @id
   createdAt         DateTime            @default(now())
   updatedAt         DateTime            @updatedAt
   key               String              @unique
   name              String              @unique
@@ -30,9 +30,9 @@
   categoryId        Int?
 }
 model Input {
-  id             Int           @default(uuid()) @id
+  id             Int           @id
   createdAt      DateTime      @default(now())
   updatedAt      DateTime      @updatedAt
   name           String        @unique
   defaultUnit    String
@@ -42,18 +42,18 @@
   unitCategoryId Int?
 }
 model SelectOption {
-  id        Int      @default(uuid()) @id
+  id        Int      @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   text      String
   select    Select?  @relation(fields: [selectId], references: [id])
   selectId  Int?
 }
 model Select {
-  id          Int            @default(uuid()) @id
+  id          Int            @id
   createdAt   DateTime       @default(now())
   updatedAt   DateTime       @updatedAt
   name        String         @unique
   icon        String?
@@ -61,18 +61,18 @@
   calculators Calculator[]   @relation(references: [id])
 }
 model UnitCategory {
-  id        Int      @default(uuid()) @id
+  id        Int      @id
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   name      String   @unique
   units     Unit[]
   inputs    Input[]
 }
 model Unit {
-  id         Int           @default(uuid()) @id
+  id         Int           @id
   createdAt  DateTime      @default(now())
   updatedAt  DateTime      @updatedAt
   name       String        @unique
   symbol     String        @unique
```


