-- CreateIndex
CREATE INDEX "article_tags_tag_id_idx" ON "article_tags"("tag_id");

-- CreateIndex
CREATE INDEX "article_tags_article_id_idx" ON "article_tags"("article_id");

-- CreateIndex
CREATE INDEX "articles_type_idx" ON "articles"("type");

-- CreateIndex
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at");

-- CreateIndex
CREATE INDEX "articles_author_id_idx" ON "articles"("author_id");

-- CreateIndex
CREATE INDEX "articles_language_code_idx" ON "articles"("language_code");

-- CreateIndex
CREATE INDEX "articles_created_at_idx" ON "articles"("created_at");

-- CreateIndex
CREATE INDEX "articles_updated_at_idx" ON "articles"("updated_at");

-- CreateIndex
CREATE INDEX "articles_type_published_at_idx" ON "articles"("type", "published_at");

-- CreateIndex
CREATE INDEX "articles_type_language_code_idx" ON "articles"("type", "language_code");

-- CreateIndex
CREATE INDEX "articles_type_author_id_idx" ON "articles"("type", "author_id");

-- CreateIndex
CREATE INDEX "articles_published_at_language_code_idx" ON "articles"("published_at", "language_code");

-- CreateIndex
CREATE INDEX "articles_type_published_at_language_code_idx" ON "articles"("type", "published_at", "language_code");
