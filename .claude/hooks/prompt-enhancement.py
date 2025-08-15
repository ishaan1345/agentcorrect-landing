#!/usr/bin/env python3
import json
import sys
import datetime

# Read input from stdin
data = json.load(sys.stdin)
prompt = data.get('user_prompt', '')

# Add context enhancements
enhancements = []

# Add timestamp context
enhancements.append(f"[Context: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}]")

# Add memory reminder if certain keywords are present
memory_keywords = ['remember', 'previous', 'earlier', 'last time', 'before']
if any(keyword in prompt.lower() for keyword in memory_keywords):
    enhancements.append("[Note: Check shared/memory/ for relevant context]")

# Add thinking mode suggestion for complex tasks
complex_keywords = ['design', 'architecture', 'refactor', 'optimize', 'plan']
if any(keyword in prompt.lower() for keyword in complex_keywords):
    enhancements.append("[Consider using 'ultrathink' or 'megathink' for this task]")

# Output enhanced prompt
if enhancements:
    enhanced_prompt = '\n'.join(enhancements) + '\n\n' + prompt
    print(json.dumps({'enhanced_prompt': enhanced_prompt}))
else:
    print(json.dumps({'enhanced_prompt': prompt}))

sys.exit(0)