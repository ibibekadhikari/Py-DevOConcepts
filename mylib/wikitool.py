"""Wikipedia tool imported"""
import wikipedia


def wiki_search(name):
    """Method to begin wiki search"""
    try:
        searched_name = wikipedia.search(name)[0]
        content = wiki_content(name, 1)
        return (searched_name, content)
    except:
        return ("Error: Try searching for other names", "")


def wiki_content(name, length):
    """Fetching wiki content"""
    content = wikipedia.summary(name, length)
    return content
