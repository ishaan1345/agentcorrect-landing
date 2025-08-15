#!/usr/bin/env python3
import json
import sys
import datetime
import os

# Read session data from stdin
data = json.load(sys.stdin)

# Create session summary
summary = {
    'timestamp': datetime.datetime.now().isoformat(),
    'duration': data.get('session_duration', 'unknown'),
    'tasks_completed': data.get('tasks_completed', []),
    'files_modified': data.get('files_modified', []),
    'commands_executed': data.get('commands_executed', [])
}

# Write summary to local memory
os.makedirs('.claude/memory', exist_ok=True)
summary_file = f".claude/memory/session-{datetime.datetime.now().strftime('%Y%m%d-%H%M%S')}.json"

with open(summary_file, 'w') as f:
    json.dump(summary, f, indent=2)

# Log key metrics
metrics_file = '.claude/memory/metrics.csv'
if not os.path.exists(metrics_file):
    with open(metrics_file, 'w') as f:
        f.write("timestamp,files_modified,commands_executed\n")

with open(metrics_file, 'a') as f:
    f.write(f"{summary['timestamp']},{len(summary['files_modified'])},{len(summary['commands_executed'])}\n")

print(f"Session summary saved to: {summary_file}")
sys.exit(0)