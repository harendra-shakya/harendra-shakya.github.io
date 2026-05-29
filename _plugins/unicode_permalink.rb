# Forces correct permalinks for documents with non-ASCII (e.g. Hindi) filenames.
# Bypasses Jekyll's slugify which strips combining characters like the Devanagari virama.
Jekyll::Hooks.register :documents, :post_init do |doc|
  next if doc.data["permalink"]

  raw_name = File.basename(doc.path, File.extname(doc.path))

  # Strip date prefix for posts (YYYY-MM-DD-slug)
  raw_name = raw_name.sub(/\A\d{4}-\d{2}-\d{2}-/, "")

  # Only apply for non-ASCII filenames
  next unless raw_name.match?(/[^\x00-\x7F]/)

  doc.data["permalink"] = "/#{raw_name}/"
end
