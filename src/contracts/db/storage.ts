// AUTO-GENERATED — DO NOT EDIT
// Source: storage_buckets.json (contract-locked)
// Generated: 2026-02-03T20:20:16.257Z

import type { SupabaseClient } from "@supabase/supabase-js";

/** Contract-locked storage bucket identifiers */
export const STORAGE_BUCKETS = {
  ARTIFACTS: "artifacts" as const,
  DOCUMENTS: "documents" as const,
  EXPORTS: "exports" as const,
} as const;

export type StorageBucketName = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

export const BUCKET_CONFIG: Record<StorageBucketName, { public: boolean }> = {
  artifacts: { public: false },
  documents: { public: true },
  exports: { public: false },
};

export interface StorageUploadOptions {
  /** Path within the bucket (e.g. "org-id/filename.pdf") */
  path: string;
  /** File data */
  file: File | Blob | ArrayBuffer;
  /** MIME content type */
  contentType?: string;
  /** Upsert if file already exists */
  upsert?: boolean;
}

/**
 * Upload a file to a contract-locked storage bucket.
 * @throws on Supabase storage error
 */
export async function uploadToBucket(
  supabase: SupabaseClient,
  bucket: StorageBucketName,
  options: StorageUploadOptions,
): Promise<{ path: string; fullPath: string }> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(options.path, options.file, {
      contentType: options.contentType,
      upsert: options.upsert ?? false,
    });
  if (error) throw error;
  return { path: data.path, fullPath: `${bucket}/${data.path}` };
}

/**
 * Get a signed URL for a private bucket object.
 * @param expiresIn seconds until the URL expires (default 3600)
 */
export async function getSignedUrl(
  supabase: SupabaseClient,
  bucket: StorageBucketName,
  path: string,
  expiresIn = 3600,
): Promise<string> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}

/**
 * Get a public URL for a public bucket object.
 */
export function getPublicUrl(
  supabase: SupabaseClient,
  bucket: StorageBucketName,
  path: string,
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a file from a bucket.
 */
export async function deleteFromBucket(
  supabase: SupabaseClient,
  bucket: StorageBucketName,
  paths: string[],
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove(paths);
  if (error) throw error;
}

/**
 * List files in a bucket path.
 */
export async function listBucketFiles(
  supabase: SupabaseClient,
  bucket: StorageBucketName,
  path?: string,
  options?: { limit?: number; offset?: number; sortBy?: { column: string; order: string } },
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path ?? "", options);
  if (error) throw error;
  return data;
}
