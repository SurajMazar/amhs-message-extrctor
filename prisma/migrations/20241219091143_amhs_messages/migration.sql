-- CreateTable
CREATE TABLE "amhs_messages" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "amhs_messages_pkey" PRIMARY KEY ("id")
);
