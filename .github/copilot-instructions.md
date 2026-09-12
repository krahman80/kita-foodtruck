## graphify

### Graphify executable

Graphify is installed in a dedicated Python virtual environment outside this repository:

```text
~/graphify/.venv/bin/graphify
```

When executing Graphify commands, use this executable directly. Do not assume `graphify` is available in the system `PATH`, and do not install Graphify again.

The current working directory must remain the repository being analyzed.

When the user asks to run `/graphify .` from this repository, execute:

```bash
~/graphify/.venv/bin/graphify .
```

Do not change the working directory to `~/graphify`. The `.` argument must refer to the current repository.

### Graphify queries

For any question about this repository's architecture, structure, components, or how to add, modify, or find code, your first action should be:

```bash
~/graphify/.venv/bin/graphify query "<question>"
```

Run this command when `graphify-out/graph.json` exists.

Use the following command for relationship questions:

```bash
~/graphify/.venv/bin/graphify path "<A>" "<B>"
```

Use the following command for focused-concept questions:

```bash
~/graphify/.venv/bin/graphify explain "<concept>"
```

These commands return a scoped subgraph, which is usually much smaller than the full report or raw `grep` output.

Use Graphify first for questions such as:

- "How do I…?"
- "Where is…?"
- "What does … do?"
- "How do I add or modify a `<component>`?"
- "Explain the architecture."
- Any question that depends on how files or classes relate.

If `graphify-out/wiki/index.md` exists, use it for broad navigation.

Read `graphify-out/GRAPH_REPORT.md` only for broad architecture reviews or when the `query`, `path`, or `explain` commands do not provide enough context.

Read source files only when:

1. Modifying or debugging specific code.
2. The graph lacks the required detail.
3. The graph is missing or stale.

### Running `/graphify`

When the user types `/graphify` in Copilot Chat, treat it as a request to build or update the Graphify graph for the current repository.

Execute Graphify using:

```bash
~/graphify/.venv/bin/graphify .
```

Keep the current working directory set to the repository being analyzed.

Do not use the system Python installation.

Do not use Python 3.9 from:

```text
/Library/Developer/CommandLineTools
```

Do not use `uv`.

Do not create another virtual environment.

Do not reinstall `graphifyy`.

After Graphify completes, use the generated files in `graphify-out/` to answer subsequent architecture and code-relationship questions.
