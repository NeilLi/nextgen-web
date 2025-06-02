import os

def create_website_structure():
    """Creates the specified website directory structure and initial files."""

    # List of top-level files and directories
    top_level = [
        "index.html",
        "about.html",
        "contact.html",
        "privacy-policy.html",
        "terms-of-service.html",
        "trust-security.html",
        "sitemap.html",
        "services",
        "solutions",
        "resources",
        "css",
        "js",
        "images"
    ]

    # Files to create within subdirectories
    subdirectory_files = {
        "services": ["index.html", "n8n-expertise.html", "ai-services.html", "GraphRAG.html", "ai-agents.html", "automation-robotics.html"],
        "solutions": ["index.html", "manufacturing-qc.html", "supply-chain-optimization.html", "healthcare-automation.html"],
        "resources": ["index.html", "blog.html", "case-studies.html", "whitepapers.html"],
        "css": ["style.css"],
        "js": ["script.js"]
    }

    for item in top_level:
        if "." in item:  # It's a file
            with open(item, "w") as f:
                f.write("<!DOCTYPE html>\n<html>\n<head>\n\t<title>" + item.split(".")[0].capitalize().replace("-", " ") + "</title>\n</head>\n<body>\n\t<h1>Welcome to " + item.split(".")[0].capitalize().replace("-", " ") + "</h1>\n</body>\n</html>")
            print(f"Created file: {item}")
        else:  # It's a directory
            os.makedirs(item, exist_ok=True)
            print(f"Created directory: {item}")
            if item in subdirectory_files:
                for sub_file in subdirectory_files[item]:
                    file_path = os.path.join(item, sub_file)
                    with open(file_path, "w") as sf:
                        sf.write("<!DOCTYPE html>\n<html>\n<head>\n\t<title>" + sub_file.split(".")[0].capitalize().replace("-", " ") + "</title>\n</head>\n<body>\n\t<h1>Welcome to " + sub_file.split(".")[0].capitalize().replace("-", " ") + "</h1>\n</body>\n</html>")
                    print(f"Created file: {file_path}")

if __name__ == "__main__":
    create_website_structure()
    print("\nWebsite structure and initial files created successfully in the current directory!")
