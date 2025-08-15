#!/bin/bash
# Test script to verify agent system functionality

echo "🧪 Testing Claude Code Agent System"
echo "===================================="

# Test 1: Check agent files exist
echo ""
echo "1. Checking agent definitions..."
if [ -d ".claude/agents" ] && [ "$(ls -1 .claude/agents/*.md 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Found $(ls -1 .claude/agents/*.md | wc -l) agent definitions"
else
    echo "❌ Agent definitions missing"
    exit 1
fi

# Test 2: Check CLAUDE.md exists
echo ""
echo "2. Checking CLAUDE.md..."
if [ -f ".claude/CLAUDE.md" ]; then
    echo "✅ CLAUDE.md exists"
else
    echo "❌ CLAUDE.md missing"
    exit 1
fi

# Test 3: Test prompt enhancement hook
echo ""
echo "3. Testing prompt enhancement hook..."
TEST_OUTPUT=$(echo '{"user_prompt": "test"}' | python3 .claude/hooks/prompt-enhancement.py 2>&1)
if echo "$TEST_OUTPUT" | grep -q "enhanced_prompt"; then
    echo "✅ Prompt enhancement hook works"
else
    echo "❌ Prompt enhancement hook failed: $TEST_OUTPUT"
    exit 1
fi

# Test 4: Check settings.json is valid JSON
echo ""
echo "4. Validating settings.json..."
if python3 -m json.tool .claude/settings.json > /dev/null 2>&1; then
    echo "✅ settings.json is valid JSON"
else
    echo "❌ settings.json has invalid JSON"
    exit 1
fi

# Test 5: Check launch script
echo ""
echo "5. Checking launch-agents script..."
if [ -x ".claude/launch-agents.sh" ]; then
    echo "✅ launch-agents.sh is executable"
else
    echo "❌ launch-agents.sh not found or not executable"
    exit 1
fi

echo ""
echo "===================================="
echo "✅ All tests passed! System is ready."
echo ""
echo "To use:"
echo "1. Edit .claude/CLAUDE.md with your project specs"
echo "2. Run: claude --dangerously-skip-permissions"
echo "3. Use: /agent orchestrator \"Your task\""
echo ""
echo "⚠️  IMPORTANT: The agents use Claude's Task() function"
echo "    which works with Claude Code's native subagents."