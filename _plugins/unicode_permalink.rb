module Jekyll
  class UnicodePermalinkGenerator < Generator
    priority :highest

    def generate(site)
      site.collections.each_value do |collection|
        collection.docs.each do |doc|
          next if doc.data["permalink"]

          raw_name = File.basename(doc.path, File.extname(doc.path))
          raw_name = raw_name.sub(/\A\d{4}-\d{2}-\d{2}-/, "")

          next unless raw_name.match?(/[^\x00-\x7F]/)

          doc.data["permalink"] = "/#{raw_name}/"
          doc.instance_variable_set(:@url, nil)
        end
      end
    end
  end
end
