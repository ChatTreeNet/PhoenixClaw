PhoenixClaw leverages OpenClaw's built-in cron system for automated, passive journaling. This configuration ensures nightly reflections occur without manual triggers.

### One-Time Setup
Run the following command to register the PhoenixClaw nightly reflection job. This schedules the task to run every day at 10:00 PM local time.

```bash
openclaw cron add \
  --name "PhoenixClaw nightly reflection" \
  --cron "0 22 * * *" \
  --tz "auto" \
  --session isolated \
  --message "Scan today's memory logs, generate daily journal entries, and update the vector index for long-term recall. Focus on key achievements and blocked tasks."
```

> **Memory & Session Scan**: Always scan session logs (`~/.openclaw/sessions/*.jsonl` or `.agent/sessions/`) alongside daily memory to capture in-progress activity. If daily memory is missing or sparse, use session logs to reconstruct context, then update daily memory.

### Configuration Details
- **--name**: Unique identifier for the job. Useful for management.
- **--cron**: Standard crontab syntax. "0 22 * * *" represents 10:00 PM daily.
- **--tz auto**: Automatically detects the system's local timezone. You can also specify a specific timezone like "America/New_York".
- **--session isolated**: Ensures the job runs in a clean environment with full tool access, preventing interference from active coding sessions.

### Verification and Monitoring
To ensure the job is correctly registered and active:

```bash
openclaw cron list
```

To view the execution history, including status codes and timestamps of previous runs:

```bash
openclaw cron history "PhoenixClaw nightly reflection"
```

### Modifying and Removing Jobs
If you need to change the schedule or the instructions, you can update the job using the same name:

```bash
openclaw cron update "PhoenixClaw nightly reflection" --cron "0 23 * * *"
```

To completely stop and delete the automated reflection job:

```bash
openclaw cron remove "PhoenixClaw nightly reflection"
```

### Troubleshooting
If journals are not appearing as expected, check the following:

1. **System Wake State**: OpenClaw cron requires the host machine to be awake. On macOS/Linux, ensure the machine isn't sleeping during the scheduled time.
2. **Path Resolution**: Ensure `openclaw` is in the system PATH available to the cron daemon.
3. **Log Inspection**: Check the internal OpenClaw logs for task-specific errors:
   ```bash
   openclaw logs --task "PhoenixClaw nightly reflection"
   ```
4. **Timezone Mismatch**: If jobs run at unexpected hours, verify the detected timezone with `openclaw cron list` and consider hardcoding the timezone if `auto` fails.
5. **Tool Access**: Ensure the `isolated` session has proper permissions to read the memory directories and write to the journal storage.
6. **Memory Search Availability**: If `memory_search` is unavailable due to a missing embeddings provider (OpenAI/Gemini/Local), journaling will still continue by scanning daily memory and session logs directly. For cross-day pattern recognition and long-term recall, consider configuring an embeddings provider.
