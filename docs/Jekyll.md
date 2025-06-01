## How to Run a Jekyll Website

**Prerequisites**

Before you begin, ensure you have the following installed on your system:

- Ruby (version 2.7.0 or higher)
- RubyGems
- GCC and Make[1]

**Step-by-Step Instructions**

1. **Install Jekyll and Bundler**

   Open your terminal and run:

   ```
   gem install jekyll bundler
   ```

   This installs the necessary gems for Jekyll[1].

2. **Create a New Jekyll Site**

   To create a new site, use:

   ```
   jekyll new myblog
   ```

   Replace `myblog` with your preferred site name[1][2].

3. **Navigate to Your Site Directory**

   Change into your new site’s directory:

   ```
   cd myblog
   ```

   This is where your Jekyll project files are located[1][2].

4. **Install Dependencies**

   Run:

   ```
   bundle install
   ```

   This ensures all required Ruby gems are installed[3].

5. **Serve the Site Locally**

   Start the local server with:

   ```
   bundle exec jekyll serve
   ```

   This builds your site and serves it at http://localhost:4000[1][2][3].

   - If you are using Ruby 3.0.0 or higher and encounter a `webrick` error, add it with:

     ```
     bundle add webrick
     ```

     Then rerun the serve command[1][3].

   - To enable automatic browser refresh on file changes, use:
     ```
     bundle exec jekyll serve --livereload
     ```

6. **Preview Your Site**

   Open your web browser and go to:

   ```
   http://localhost:4000
   ```

   Your Jekyll site should now be running and viewable locally[1][3].

**Common Jekyll CLI Commands**

| Command                     | Description                                        |
| --------------------------- | -------------------------------------------------- |
| `jekyll new [site name]`    | Creates a new Jekyll site                          |
| `jekyll build`              | Generates the static site in the `_site` directory |
| `jekyll serve`              | Builds and serves the site locally                 |
| `jekyll serve --livereload` | Serves the site with live reload on changes        |
| `jekyll clean`              | Deletes the `_site` directory                      |
| `jekyll doctor`             | Checks for configuration/dependency issues         |
| `jekyll help`               | Displays help documentation                        |
| `jekyll serve --draft`      | Serves site including draft posts                  |

[2]

**Troubleshooting**

- If you encounter errors, ensure all prerequisites are installed and check the official Jekyll documentation for troubleshooting steps[1][3].

**Additional Resources**

- For deploying your Jekyll site to platforms like GitHub Pages or Azure Static Web Apps, refer to their respective documentation for deployment instructions[5][6].

With these steps, you can quickly set up and run a Jekyll website locally for development and preview.

Citations:
[1] https://jekyllrb.com/docs/
[2] https://kinsta.com/blog/jekyll-static-site/
[3] https://docs.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll
[4] https://jekyllrb.com
[5] https://learn.microsoft.com/en-us/azure/static-web-apps/publish-jekyll
[6] https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll
[7] https://www.youtube.com/watch?v=iWowJBRMtpc

---

Answer from Perplexity: https://www.perplexity.ai/search/how-to-run-jekll-website-m1n3LfgFTxGJ2wnS_SFs6Q?utm_source=copy_output
