module Jekyll
  class ObsidianLinkConverter < Generator
    safe true
    priority :high

    def generate(site)
      site.pages.each do |page|
        next unless page.ext == '.md'
        content = page.content.dup
        
        # Convert [[link]] to [link](link.md)
        content.gsub!(/\[\[([^\]\|]+)\]\]/) do |match|
          link = $1.strip
          "[#{link}](#{link.downcase.gsub(' ', '-')}.md)"
        end
        
        page.content = content
      end
    end
  end
end
