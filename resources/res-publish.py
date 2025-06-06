import sys
import os
from bs4 import BeautifulSoup

# --- Configuration ---
# Make paths absolute based on the script's location.
# This makes the script runnable from any directory.
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RESOURCES_INDEX_PATH = os.path.join(SCRIPT_DIR, 'index.html')


def extract_page_details(html_path):
    """
    Extracts the primary title and description from a given HTML file.
    It assumes the card title should come from the H1 tag and the description
    from the first paragraph that follows it.
    """
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

        title_tag = soup.find('h1')
        if not title_tag:
            print(f"Warning: No <h1> tag found in {html_path}. Cannot determine title.")
            return None, None
        title = title_tag.get_text(strip=True)

        description_tag = title_tag.find_next_sibling('p')
        if not description_tag:
            description = f"Explore our comprehensive resource on {title}."
        else:
            description = description_tag.get_text(strip=True)

        return title, description
    except FileNotFoundError:
        print(f"Error: The file {html_path} was not found.")
        return None, None
    except Exception as e:
        print(f"An error occurred while parsing {html_path}: {e}")
        return None, None


def create_resource_card_html(title, description, filename):
    """
    Generates the HTML string for a new resource card using the extracted details.
    """
    icon_class = "fas fa-brain"
    return f"""
            <div class="resource-card">
                <div class="card-icon"><i class="{icon_class}"></i></div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a href="{filename}" class="view-resource-btn">View Resource</a>
            </div>"""


def add_resource(filename_to_add):
    """
    Adds a new resource card to the main index page.
    """
    new_page_path = os.path.join(SCRIPT_DIR, filename_to_add)

    if not os.path.exists(new_page_path):
        print(f"Error: The new page '{new_page_path}' does not exist.")
        sys.exit(1)

    print(f"-> Reading details from '{new_page_path}'...")
    title, description = extract_page_details(new_page_path)

    if not title or not description:
        print("Extraction failed. Aborting script.")
        sys.exit(1)
        
    print(f"   - Title: '{title}'")
    print(f"   - Description: '{description[:70]}...'")

    new_card_html = create_resource_card_html(title, description, filename_to_add)
    
    try:
        print(f"-> Updating '{RESOURCES_INDEX_PATH}' to add card...")
        with open(RESOURCES_INDEX_PATH, 'r+', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
            grid = soup.find('div', class_='resources-grid')
            if not grid:
                print(f"Error: Could not find '<div class=\"resources-grid\">' in the index file.")
                sys.exit(1)
            
            if grid.find('a', href=filename_to_add):
                print(f"Info: A resource card for '{filename_to_add}' already exists. No changes made.")
                return

            new_card_soup = BeautifulSoup(new_card_html, 'html.parser')
            grid.append(new_card_soup)
            
            f.seek(0)
            f.write(soup.prettify())
            f.truncate()
            
        print(f"\nSuccess! A resource card for '{filename_to_add}' has been added to your Knowledge Hub.")

    except Exception as e:
        print(f"An error occurred while trying to update '{RESOURCES_INDEX_PATH}': {e}")
        sys.exit(1)


def delete_resource(filename_to_delete):
    """
    Finds and deletes a resource card from the main index page.
    """
    try:
        print(f"-> Updating '{RESOURCES_INDEX_PATH}' to remove card...")
        with open(RESOURCES_INDEX_PATH, 'r+', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'html.parser')

            link_to_delete = soup.find('a', href=filename_to_delete)
            if not link_to_delete:
                print(f"Info: No resource card found for '{filename_to_delete}'. No changes made.")
                return

            card_to_delete = link_to_delete.find_parent('div', class_='resource-card')
            if card_to_delete:
                card_to_delete.decompose()
                
                f.seek(0)
                f.write(soup.prettify())
                f.truncate()
                
                print(f"\nSuccess! The resource card for '{filename_to_delete}' has been removed.")
            else:
                print(f"Error: Found a link for '{filename_to_delete}' but could not find its parent resource card to delete.")

    except Exception as e:
        print(f"An error occurred while trying to update '{RESOURCES_INDEX_PATH}': {e}")
        sys.exit(1)


def main():
    """
    Main function to dispatch add or delete operations.
    """
    if len(sys.argv) < 2:
        print("Usage:")
        print("  To add: python res-publish.py <filename.html>")
        print("  To delete: python res-publish.py --delete <filename.html>")
        sys.exit(1)

    if not os.path.exists(RESOURCES_INDEX_PATH):
        print(f"Error: Main resources page not found at '{RESOURCES_INDEX_PATH}'.")
        print("Please ensure 'index.html' is in the same directory as the script.")
        sys.exit(1)

    if sys.argv[1] == '--delete':
        if len(sys.argv) < 3:
            print("Usage: python res-publish.py --delete <filename.html>")
            sys.exit(1)
        filename_to_process = sys.argv[2]
        delete_resource(filename_to_process)
    else:
        filename_to_process = sys.argv[1]
        add_resource(filename_to_process)


if __name__ == "__main__":
    # To run the script, you'll first need to install BeautifulSoup:
    # pip install beautifulsoup4
    main()
