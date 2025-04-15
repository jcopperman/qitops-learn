
#!/bin/bash

OWNER="jcopperman"
REPO="qitops-learn"
PROJECT_ID="7"

create_issue_and_add() {
  TITLE="$1"
  BODY="$2"

  echo "Creating issue: $TITLE"
  gh issue create --repo "$OWNER/$REPO" --title "$TITLE" --body "$BODY" --label "roadmap" --assignee "@me"

  echo "Fetching issue URL..."
  ISSUE_URL=$(gh issue list --repo "$OWNER/$REPO" --state open --limit 1 --sort created | awk 'NR==2 {print $1}')

  if [ -z "$ISSUE_URL" ]; then
    echo "⚠️ Issue creation failed or issue URL could not be retrieved"
    return
  fi

  ISSUE_URL="https://github.com/$OWNER/$REPO/issues/${ISSUE_URL#'#'}"
  echo "Created: $ISSUE_URL"
  echo "Adding to project..."
  gh project item-add "$PROJECT_ID" --owner "$OWNER" --url "$ISSUE_URL"
}

# Phase 1 – Authority & Momentum
create_issue_and_add "Publish 'What is QitOps?' blog post" "Part of Phase 1 – Authority & Momentum"
create_issue_and_add "Record and share a 3-minute intro to QitOps Learn" "Part of Phase 1 – Authority & Momentum"
create_issue_and_add "Launch QitOps Learn: Test Analyst track" "Part of Phase 1 – Authority & Momentum"
create_issue_and_add "Demo: Test Generation using AI + YAML + Robot Framework" "Part of Phase 1 – Authority & Momentum"
create_issue_and_add "Start weekly LinkedIn updates on QitOps philosophy and practices" "Part of Phase 1 – Authority & Momentum"

# Phase 2 – Community as a Movement
create_issue_and_add "Create a QitOps Community Discord or Slack" "Part of Phase 2 – Community as a Movement"
create_issue_and_add "Write 'How to Get Involved with QitOps'" "Part of Phase 2 – Community as a Movement"
create_issue_and_add "Run async mentorship beta (3–5 testers)" "Part of Phase 2 – Community as a Movement"
create_issue_and_add "Enable GitHub Discussions for roadmap feedback" "Part of Phase 2 – Community as a Movement"
create_issue_and_add "Highlight QitOps learner testimonials and journeys" "Part of Phase 2 – Community as a Movement"

# Phase 3 – Productization & Growth
create_issue_and_add "Package and sell QitOps Starter Kit (Markdown + YAML templates)" "Part of Phase 3 – Productization & Growth"
create_issue_and_add "Offer pre-orders or early access bundles for QitOps premium courses" "Part of Phase 3 – Productization & Growth"
create_issue_and_add "Host 'Future of QA' livestream or founder fireside chat" "Part of Phase 3 – Productization & Growth"
create_issue_and_add "Release CLI utilities with documentation (e.g. qitops-ai, qitops-risk)" "Part of Phase 3 – Productization & Growth"

# Ongoing / Evergreen
create_issue_and_add "Maintain and evolve QitOps Disciplines and Role Roadmaps" "Ongoing task for long-term platform integrity"
create_issue_and_add "Write monthly QitOps founder reflections (Notion or blog)" "Ongoing personal practice"
create_issue_and_add "Mentor one early career QA per quarter" "Ongoing community impact effort"
