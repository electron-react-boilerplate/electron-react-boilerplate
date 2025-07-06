---
description: Guides Cline on how to spawn and manage Claude Code subagents
author: https://github.com/nickbaumann98
version: 1.0
tags: ["subagents", "claude code", "multi-agent"]
globs: ["*"]
---
# Claude Code Subagent Rules

## Basic Spawning
```bash
# Simple execution
claude -p "Your prompt here"

# With JSON output for parsing
claude -p "Build feature" --output-format json

# With streaming for long tasks
claude -p "Complex task" --output-format stream-json --verbose
```

## Session Management
```bash
# Capture session ID
SESSION_ID=$(claude -p "Start task" --output-format json | jq -r '.session_id')

# Continue session
claude -p --resume "$SESSION_ID" "Next step"

# Continue most recent
claude -p --continue "Add more features"
```

## Essential Options
```bash
# Limit turns to control cost
claude -p "Task" --max-turns 3

# Custom system prompt
claude -p "Task" --system-prompt "You are an expert in X"

# Allow/disallow specific tools
claude -p "Task" --allowedTools "Read,Write,Bash"
claude -p "Task" --disallowedTools "Bash(rm)"

# Permission modes for autonomous operation
claude -p "Task" --permission-mode acceptEdits    # Auto-accept file edits
claude -p "Task" --permission-mode bypassPermissions  # Skip all permission prompts
claude -p "Task" --permission-mode plan          # Plan mode only
```
## Autonomous Subagents
```bash
# Fully autonomous - bypasses ALL permission prompts
claude -p "Build complete app" --permission-mode bypassPermissions --max-turns 10

# Auto-accept edits but prompt for dangerous operations
claude -p "Refactor codebase" --permission-mode acceptEdits --max-turns 5

# Combine with tool restrictions for safety
claude -p "Safe autonomous task" \
  --permission-mode bypassPermissions \
  --disallowedTools "Bash(rm),Bash(git push)" \
  --max-turns 3
```

## Monitoring & Error Handling
```bash
# Check success and extract data
if RESULT=$(claude -p "$prompt" --output-format json); then
    COST=$(echo "$RESULT" | jq -r '.total_cost_usd')
    echo "Success! Cost: $COST USD"
else
    echo "Failed with exit code $?"
fi

# Timeout for long tasks
timeout 300 claude -p "$prompt" || echo "Timed out"
```

## Advanced Pattern: Parallel Agentic Workflows

This pattern, inspired by "Midjourney for Code," involves spawning multiple agents in isolated environments to generate diverse solutions to a single problem. This is useful for prototyping, A/B testing features, or exploring different implementations.

### Core Principle: Keep It Simple

The claude CLI is already well-designed for autonomous operation. Don't over-engineer with complex monitoring or JSON parsing unless you specifically need it.

### Pattern 1: Simple Parallel Variations

The most effective pattern for generating multiple variations:

```bash
#!/bin/bash
# spawn_variations.sh - Dead simple parallel execution

# Define your variations
for i in {1..5}; do
  mkdir -p "variant-$i"
  (
    cd "variant-$i" && \
    claude -p "Build [YOUR TASK] - Variation $i: [specific approach/style]" \
      --permission-mode bypassPermissions \
      --max-turns 15
  ) &
done

wait
echo "✅ All variations complete. Check variant-*/ directories"
```

That's it. The claude CLI handles progress display, error reporting, and retries automatically.

### Pattern 2: Parallel Features on Existing Codebase

For working on an existing project with git:

```bash
#!/bin/bash
# spawn_features.sh - Parallel feature development

FEATURE="implement dark mode"
BASE_BRANCH=$(git branch --show-current)

for approach in "css-variables" "theme-provider" "tailwind-classes"; do
  git checkout -b "feature-$approach" "$BASE_BRANCH"
  
  (
    claude -p "Add $FEATURE using $approach approach" \
      --permission-mode bypassPermissions \
      --max-turns 20
  ) &
done

wait
echo "✅ Features ready on branches: feature-*"
```

### Pattern 3: Quick A/B Testing

For comparing different implementations:

```bash
#!/bin/bash
# ab_test.sh - Compare two approaches

mkdir -p option-a option-b

# Option A
(cd option-a && claude -p "Build a todo app using vanilla JavaScript" --permission-mode bypassPermissions) &

# Option B  
(cd option-b && claude -p "Build a todo app using React" --permission-mode bypassPermissions) &

wait
echo "✅ Both options ready for comparison"
```

### When to Add Complexity

Only add monitoring/logging when you need:
- **Automated selection** - Parsing results to pick best variant
- **CI/CD integration** - Running in non-interactive environments  
- **Cost tracking** - Analyzing spend across many runs
- **Bulk operations** - Managing 10+ parallel agents

For interactive development, the simple patterns above are optimal.

### Monitoring (When Needed)

If you need to monitor progress:

```bash
# In another terminal
watch -n 2 'find . -name "*.html" -o -name "*.js" | wc -l'

# Or check completion
ls -d variant-*/index.html 2>/dev/null | wc -l
```

### Cost Awareness

```bash
# Set turn limits based on task complexity
SIMPLE_TASK_TURNS=5
MEDIUM_TASK_TURNS=10  
COMPLEX_TASK_TURNS=20

claude -p "Simple task" --max-turns $SIMPLE_TASK_TURNS
```

## Key Tips
- **Keep it simple** - Basic bash patterns work best
- **Trust the tool** - Claude CLI already handles errors, retries, and progress
- **Set `--max-turns`** to control costs
- **Use `--permission-mode bypassPermissions`** for fully autonomous operation
- **Don't capture output you won't use** - Let the CLI display progress naturally