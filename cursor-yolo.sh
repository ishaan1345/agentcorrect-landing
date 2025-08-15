#!/bin/bash
# YOLO mode for Cursor IDE users

echo "🚀 Starting Claude Code YOLO Mode in Cursor"
echo "✅ You're in Cursor, so you have immediate access to changes"
echo "⚠️  Make sure you have Git commits for safety!"
echo ""

# Check if Git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git for safety..."
    git init
    git add .
    git commit -m "Backup before YOLO mode"
fi

echo "Starting Claude in YOLO mode..."
echo "You can now use Claude to build your V0 without interruptions"
echo ""

claude --dangerously-skip-permissions "$@"