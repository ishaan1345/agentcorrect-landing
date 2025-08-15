#!/usr/bin/env python3
import json
import sys

# Read input from stdin
data = json.load(sys.stdin)
file_path = data['tool_input']['file_path']

# Security checks
forbidden_paths = ['.env', '.git/', 'node_modules/', '*.key', '*.pem']
for forbidden in forbidden_paths:
    if forbidden in file_path:
        print(f"BLOCKED: Attempt to modify sensitive file: {file_path}", file=sys.stderr)
        sys.exit(2)  # Block the operation

sys.exit(0)  # Allow the operation