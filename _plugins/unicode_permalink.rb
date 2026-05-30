module Jekyll
  class UnicodePermalinkGenerator < Generator
    priority :highest

    # Devanagari Unicode block: U+0900–U+097F
    DEVANAGARI = /[ऀ-ॿ]/

    def generate(site)
      site.collections.each_value do |collection|
        collection.docs.each do |doc|
          next if doc.data["permalink"]

          raw_name = File.basename(doc.path, File.extname(doc.path))

          # Strip date prefix for posts (YYYY-MM-DD-slug)
          raw_name = raw_name.sub(/\A\d{4}-\d{2}-\d{2}-/, "")

          # Only apply for filenames that contain Devanagari characters.
          # English filenames (even with em-dashes or special chars) are
          # handled correctly by Jekyll's default slugify mode.
          next unless raw_name.match?(DEVANAGARI)

          # Replace spaces with hyphens so URLs stay valid
          slug = raw_name.gsub(" ", "-")

          doc.data["permalink"] = "/#{slug}/"
          doc.instance_variable_set(:@url, nil)
        end
      end
    end
  end
end
