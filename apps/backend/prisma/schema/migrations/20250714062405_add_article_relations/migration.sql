-- CreateTable
CREATE TABLE "article_relations" (
    "id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "relation_type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "article_relations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "article_relations_source_id_idx" ON "article_relations"("source_id");

-- CreateIndex
CREATE INDEX "article_relations_target_id_idx" ON "article_relations"("target_id");

-- CreateIndex
CREATE INDEX "article_relations_relation_type_idx" ON "article_relations"("relation_type");

-- CreateIndex
CREATE INDEX "article_relations_source_id_relation_type_idx" ON "article_relations"("source_id", "relation_type");

-- CreateIndex
CREATE INDEX "article_relations_target_id_relation_type_idx" ON "article_relations"("target_id", "relation_type");

-- CreateIndex
CREATE INDEX "article_relations_source_id_order_idx" ON "article_relations"("source_id", "order");

-- CreateIndex
CREATE INDEX "article_relations_target_id_order_idx" ON "article_relations"("target_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "article_relations_source_id_target_id_relation_type_key" ON "article_relations"("source_id", "target_id", "relation_type");

-- AddForeignKey
ALTER TABLE "article_relations" ADD CONSTRAINT "article_relations_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_relations" ADD CONSTRAINT "article_relations_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
