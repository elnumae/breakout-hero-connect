import requests
from linkedin_api import Linkedin
import json
from bs4 import BeautifulSoup
from datetime import datetime

# Configuration
LINKEDIN_EMAIL = "your_linkedin_email"
LINKEDIN_PASSWORD = "your_linkedin_password"
GITHUB_TOKEN = "your_github_personal_access_token"
LINKEDIN_PROFILE_ID = "john-doe"  # e.g., from linkedin.com/in/john-doe
GITHUB_USERNAME = "johndoe"  # GitHub username

# Common tech skills to check in GitHub projects
TECH_SKILLS = [
    "Python", "JavaScript", "Java", "C++", "SQL", "HTML", "CSS", "React",
    "Node.js", "TensorFlow", "Django", "Flask", "TypeScript", "Go",
    "Ruby", "PHP", "Kubernetes", "Docker", "AWS", "MySQL", "PostgreSQL"
]

# Extract experience and skills from LinkedIn profile
def get_linkedin_data(profile_id):
    try:
        api = Linkedin(LINKEDIN_EMAIL, LINKEDIN_PASSWORD)
        profile = api.get_profile(profile_id)
        
        # Extract skills
        skills = [skill.get("name", "").lower() for skill in profile.get("skills", []) if skill.get("name")]
        
        # Extract experience
        experiences = []
        for exp in profile.get("experience", []):
            experience = {
                "title": exp.get("title", "N/A"),
                "company": exp.get("companyName", "N/A"),
                "description": exp.get("description", "No description provided"),
                "duration": {
                    "start_date": f"{exp.get('timePeriod', {}).get('startDate', {}).get('month', 'N/A')}/{exp.get('timePeriod', {}).get('startDate', {}).get('year', 'N/A')}",
                    "end_date": f"{exp.get('timePeriod', {}).get('endDate', {}).get('month', 'N/A')}/{exp.get('timePeriod', {}).get('endDate', {}).get('year', 'Present')}",
                    "duration_text": calculate_duration(
                        exp.get("timePeriod", {}).get("startDate", {}),
                        exp.get("timePeriod", {}).get("endDate", {})
                    )
                }
            }
            experiences.append(experience)
        
        return {
            "skills": skills,
            "experiences": experiences
        }
    except Exception as e:
        print(f"Error fetching LinkedIn data: {e}")
        return {"skills": [], "experiences": []}

# Helper function to calculate job duration
def calculate_duration(start_date, end_date):
    try:
        start = datetime(
            year=start_date.get("year", 2000),
            month=start_date.get("month", 1),
            day=1
        )
        end = datetime.now() if not end_date else datetime(
            year=end_date.get("year", datetime.now().year),
            month=end_date.get("month", datetime.now().month),
            day=1
        )
        months = (end.year - start.year) * 12 + end.month - start.month
        years, months = divmod(months, 12)
        duration = []
        if years:
            duration.append(f"{years} year{'s' if years > 1 else ''}")
        if months:
            duration.append(f"{months} month{'s' if months > 1 else ''}")
        return " ".join(duration) or "Less than a month"
    except:
        return "N/A"

# Extract skills from GitHub repositories
def get_github_skills(username):
    try:
        headers = {"Authorization": f"token {GITHUB_TOKEN}"}
        skills = set()

        # Fetch user repositories
        repos_url = f"https://api.github.com/users/{username}/repos"
        repos_response = requests.get(repos_url, headers=headers)
        if repos_response.status_code != 200:
            print(f"Error fetching GitHub repos: {repos_response.status_code}")
            return []

        repos = repos_response.json()
        for repo in repos:
            # Check repository language
            language = repo.get("language", "").lower()
            if language and language in [skill.lower() for skill in TECH_SKILLS]:
                skills.add(language)

            # Check repository description
            description = repo.get("description", "").lower()
            for skill in TECH_SKILLS:
                if skill.lower() in description:
                    skills.add(skill.lower())

            # Fetch README content
            readme_url = f"https://api.github.com/repos/{username}/{repo['name']}/readme"
            readme_response = requests.get(readme_url, headers=headers)
            if readme_response.status_code == 200:
                readme_content = readme_response.json().get("content", "")
                readme_text = BeautifulSoup(
                    requests.get(readme_response.json().get("download_url")).text, 
                    "html.parser"
                ).get_text().lower()
                for skill in TECH_SKILLS:
                    if skill.lower() in readme_text:
                        skills.add(skill.lower())

        return list(skills)
    except Exception as e:
        print(f"Error fetching GitHub skills: {e}")
        return []

# Main function to run both scrapers
def main():
    linkedin_data = get_linkedin_data(LINKEDIN_PROFILE_ID)
    github_skills = get_github_skills(GITHUB_USERNAME)

    # Combine and deduplicate skills
    all_skills = list(set(linkedin_data["skills"] + github_skills))

    # Save results to a JSON file
    results = {
        "linkedin_profile_id": LINKEDIN_PROFILE_ID,
        "github_username": GITHUB_USERNAME,
        "linkedin_data": {
            "skills": linkedin_data["skills"],
            "experiences": linkedin_data["experiences"]
        },
        "github_skills": github_skills,
        "combined_skills": all_skills
    }

    with open("user_profile_data.json", "w") as f:
        json.dump(results, f, indent=4)
    print("Profile data saved to user_profile_data.json")

if __name__ == "__main__":
    main()