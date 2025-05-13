import os
import sys

def batch_replace_in_files(directory, old_string, new_string, skip_dirs):
    """
    Recursively finds files in a directory and replaces a string within them.

    Args:
        directory (str): The root directory to start searching from.
        old_string (str): The string to find.
        new_string (str): The string to replace with.
        skip_dirs (list): A list of directory names to skip.
    """
    print(f"Starting replacement in directory: {directory}")
    print(f"Replacing '{old_string}' with '{new_string}'")
    print("-" * 20) # Separator for clarity

    for root, dirs, files in os.walk(directory):
        # Print current directory being visited and its contents (for debugging)
        print(f"Visiting directory: {root}")
        print(f"  Subdirectories found: {dirs}")
        print(f"  Files found: {files}")

        # Modify dirs in-place to skip directories
        dirs[:] = [d for d in dirs if d not in skip_dirs]
        print(f"  Subdirectories after skipping {skip_dirs}: {dirs}")
        print("-" * 20) # Separator for clarity


        for file in files:
            filepath = os.path.join(root, file)
            # Skip directories that were just pruned from 'dirs' list but might still be in 'files' list
            # This is an extra precaution, though typically files are not listed as directories here.
            if os.path.isdir(filepath):
                continue

            try:
                # Attempt to read the file
                # Use 'rb' to read in binary mode initially to avoid decoding errors on open
                with open(filepath, 'rb') as f:
                    file_content_bytes = f.read()

                # Try decoding the content as UTF-8
                try:
                    file_content_text = file_content_bytes.decode('utf-8')
                except UnicodeDecodeError:
                    print(f"Skipping (cannot decode as UTF-8): {filepath}")
                    continue # Skip to the next file if decoding fails
                except Exception as e:
                    print(f"Error decoding {filepath}: {e}")
                    continue # Skip if any other decoding error occurs


                # Perform the replacement
                new_content_text = file_content_text.replace(old_string, new_string)

                # Write the modified content back to the file if changes were made
                if new_content_text != file_content_text:
                    # Use 'w' to write text content
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content_text)
                    print(f"Modified: {filepath}")
                # else:
                    # Optional: Uncomment to see files that weren't modified
                    # print(f"No change in: {filepath}")

            except Exception as e:
                print(f"Error processing {filepath}: {e}")

    print("Replacement process finished.")

if __name__ == "__main__":
    # Define the directory (current directory where the script is run)
    project_root_directory = "." # You can change this to a specific path if needed

    # Define the strings to replace
    string_to_find = "AutoMind"
    string_to_replace = "AutoMind"

    # Define directories to skip (defined here to be accessible for the prompt)
    skip_dirs = ['.git', '__pycache__', '.venv'] # Add other directories to skip if needed

    # Add a confirmation step before proceeding
    confirm = input(f"This script will replace all occurrences of '{string_to_find}' with '{string_to_replace}' in all files within '{project_root_directory}' and its subdirectories (excluding {skip_dirs}). Are you sure you want to proceed? (yes/no): ").lower()

    if confirm == 'yes':
        batch_replace_in_files(project_root_directory, string_to_find, string_to_replace, skip_dirs)
    else:
        print("Operation cancelled by user.")


